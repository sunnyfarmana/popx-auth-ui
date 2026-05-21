import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    agency: 'yes',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isFormValid = 
    formData.fullName.trim() !== '' && 
    formData.phone.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.password.trim() !== '' && 
    formData.company.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.password.length < 6) {
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
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        agency: formData.agency,
        password: formData.password // Sync local password
      });
      
      navigate('/profile');
    } catch (err: any) {
      setErrors({ email: err.message || 'Registration failed or email already exists' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col h-full !pb-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col h-full overflow-hidden"
        >
          {/* Header */}
          <h1 className="text-[28px] font-bold text-slate-800 mb-6 mt-4 leading-tight tracking-tight">
            Create your <br /> PopX account
          </h1>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full justify-between relative overflow-hidden">
            {/* Scrollable form fields area */}
            <div className="flex-1 overflow-y-auto hide-scrollbar pt-2 pb-24 space-y-6">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                showRequiredIndicator
                placeholder="Enter full name"
                disabled={isSubmitting}
              />
              <Input
                label="Phone number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                showRequiredIndicator
                placeholder="Enter phone number"
                disabled={isSubmitting}
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                showRequiredIndicator
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showRequiredIndicator
                placeholder="Enter password"
                disabled={isSubmitting}
              />
              <Input
                label="Company name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                disabled={isSubmitting}
              />

              {/* Agency Radio Buttons */}
              <div className="pt-2">
                <label className="block text-[13px] font-semibold text-slate-500 mb-3">
                  Are you an Agency?<span className="text-primary ml-0.5">*</span>
                </label>
                <div className="flex items-center gap-6">
                  {/* Option Yes */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-slate-300 transition-colors duration-200">
                      <input
                        type="radio"
                        name="agency"
                        value="yes"
                        checked={formData.agency === 'yes'}
                        onChange={handleChange}
                        className="absolute opacity-0 w-full h-full cursor-pointer peer z-10"
                        disabled={isSubmitting}
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200"></div>
                      <div className="absolute inset-0 rounded-full border-primary opacity-0 peer-checked:opacity-100 border-2 transition-all duration-200"></div>
                    </div>
                    <span className="text-slate-700 text-[14px] font-medium">Yes</span>
                  </label>
                  
                  {/* Option No */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-slate-300 transition-colors duration-200">
                      <input
                        type="radio"
                        name="agency"
                        value="no"
                        checked={formData.agency === 'no'}
                        onChange={handleChange}
                        className="absolute opacity-0 w-full h-full cursor-pointer peer z-10"
                        disabled={isSubmitting}
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200"></div>
                      <div className="absolute inset-0 rounded-full border-primary opacity-0 peer-checked:opacity-100 border-2 transition-all duration-200"></div>
                    </div>
                    <span className="text-slate-700 text-[14px] font-medium">No</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Sticky footer action button */}
            <div className="absolute bottom-0 left-0 right-0 py-5 bg-white border-t border-slate-50 flex flex-col gap-3">
              <motion.div
                whileHover={isFormValid ? { scale: 1.01 } : {}}
                whileTap={isFormValid ? { scale: 0.99 } : {}}
              >
                <Button 
                  type="submit" 
                  disabled={!isFormValid || isSubmitting}
                  className="shimmer-btn py-3.5 bg-primary text-white rounded-lg font-bold"
                >
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </Button>
              </motion.div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[13px] text-slate-400 font-bold hover:underline focus:outline-none py-1 self-center"
                disabled={isSubmitting}
              >
                Already Registered? Login
              </button>
            </div>
          </form>
        </motion.div>
      </CardContent>
    </Card>
  );
};
