import { useState, useEffect } from 'react';

export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  agency?: string;
  password?: string;
}

const API_URL = 'http://localhost:5000/api';

// Helper to manage localStorage mock database
const getLocalUsers = (): User[] => {
  const data = localStorage.getItem('popx_local_db_users');
  return data ? JSON.parse(data) : [];
};

const saveLocalUsers = (users: User[]) => {
  localStorage.setItem('popx_local_db_users', JSON.stringify(users));
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('popx_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // 1. Check if it's a client-only token
      if (token.startsWith('local_token_')) {
        const userId = token.replace('local_token_', '');
        const localUsers = getLocalUsers();
        const found = localUsers.find(u => u.id === userId);
        if (found) {
          setUser({
            id: found.id,
            fullName: found.fullName,
            email: found.email,
            phone: found.phone,
            company: found.company,
            agency: found.agency
          });
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('popx_token');
        }
        setIsLoading(false);
        return;
      }

      // 2. Try fetching from actual backend
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('popx_token');
        }
      } catch (error) {
        console.warn('Backend server unreachable, trying client-side fallback for session recovery:', error);
        // If server is down, see if we can find a user in localStorage matching a saved user.
        // We'll treat the token as the userId as a backup.
        const localUsers = getLocalUsers();
        const found = localUsers.find(u => u.email === token || u.id === token);
        if (found) {
          setUser({
            id: found.id,
            fullName: found.fullName,
            email: found.email,
            phone: found.phone,
            company: found.company,
            agency: found.agency
          });
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('popx_token');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email: string, password?: string) => {
    // 1. Try backend server
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        setUser({
          id: data.id,
          fullName: data.fullName,
          email: data.email
        });
        setIsAuthenticated(true);
        localStorage.setItem('popx_token', data.token);
        return;
      }
      
      if (res.status === 401) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.warn('Backend server unreachable, falling back to local client auth:', error);
      
      // Prevent network error throwing when matching details exist locally
      const localUsers = getLocalUsers();
      const found = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (found && (!password || found.password === password)) {
        setUser({
          id: found.id,
          fullName: found.fullName,
          email: found.email,
          phone: found.phone,
          company: found.company,
          agency: found.agency
        });
        setIsAuthenticated(true);
        localStorage.setItem('popx_token', `local_token_${found.id}`);
        return;
      }
      
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (userData: User) => {
    // 1. Try backend server
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        const data = await res.json();
        setUser({
          id: data.id,
          fullName: data.fullName,
          email: data.email
        });
        setIsAuthenticated(true);
        localStorage.setItem('popx_token', data.token);
        
        // Also sync to local database in case they offline test later
        const localUsers = getLocalUsers();
        if (!localUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
          localUsers.push({ ...userData, id: data.id });
          saveLocalUsers(localUsers);
        }
        return;
      }
      
      if (res.status === 400) {
        throw new Error('User already exists');
      }
    } catch (error) {
      console.warn('Backend server unreachable, falling back to local client registration:', error);
      
      const localUsers = getLocalUsers();
      const userExists = localUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      
      if (userExists) {
        throw new Error('Registration failed or email already exists');
      }

      const newId = Date.now().toString();
      const newUserRecord = { ...userData, id: newId };
      localUsers.push(newUserRecord);
      saveLocalUsers(localUsers);

      setUser({
        id: newId,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        company: userData.company,
        agency: userData.agency
      });
      setIsAuthenticated(true);
      localStorage.setItem('popx_token', `local_token_${newId}`);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('popx_token');
  };

  return { user, isAuthenticated, isLoading, login, signup, logout };
};
