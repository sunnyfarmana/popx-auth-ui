import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-b from-white to-purple-50/20">
      <CardContent className="justify-end pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          {/* Logo or Brand Mark */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 self-start">
            <div className="w-6 h-6 rounded-lg bg-primary shadow-sm shadow-primary/30 rotate-12"></div>
          </div>

          <h1 className="text-[28px] font-bold text-slate-800 mb-2 leading-tight tracking-tight">
            Welcome to PopX
          </h1>
          
          <p className="text-slate-500 mb-8 font-medium text-[15px] leading-relaxed">
            Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
          </p>

          <div className="flex flex-col gap-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button onClick={() => navigate('/signup')}>
                Create Account
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Already Registered? Login
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
