import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { DeviceFrame } from './components/DeviceFrame';

function App() {
  return (
    <BrowserRouter>
      <DeviceFrame>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </DeviceFrame>
    </BrowserRouter>
  );
}

export default App;
