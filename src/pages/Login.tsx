import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    // Simple validation
    const newErrors: { email?: string; password?: string } = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate slight network delay for smooth spinner transitions
      await new Promise(resolve => setTimeout(resolve, 600));
      await login(email, password);
      navigate('/profile');
    } catch (err: any) {
      setErrors({ email: err.message || 'Invalid email or password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col h-full"
        >
          {/* Header */}
          <h1 className="text-[28px] font-bold text-slate-800 mb-2 mt-4 leading-tight tracking-tight">
            Signin to your <br /> PopX account
          </h1>
          <p className="text-slate-500 mb-8 text-[15px] font-medium leading-relaxed">
            Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
            <div className="flex-1 space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: undefined });
                }}
                error={errors.email}
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
                error={errors.password}
                placeholder="Enter password"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="mt-8 mb-4">
              <motion.div
                whileHover={isFormValid ? { scale: 1.01 } : {}}
                whileTap={isFormValid ? { scale: 0.99 } : {}}
              >
                <Button 
                  type="submit" 
                  disabled={!isFormValid || isSubmitting}
                  className="shimmer-btn py-3.5 bg-primary text-white rounded-lg font-bold"
                >
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </Button>
              </motion.div>
              
              <div className="text-center mt-6">
                <span className="text-[13px] text-slate-400 font-medium">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-[13px] text-primary font-bold hover:underline focus:outline-none"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </CardContent>
    </Card>
  );
};
