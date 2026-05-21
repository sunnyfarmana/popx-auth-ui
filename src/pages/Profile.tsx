import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar } from '../components/Avatar';
import { useAuth } from '../hooks/useAuth';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Top Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-100 flex items-center z-10 shrink-0 select-none">
        <h1 className="text-[17px] font-bold text-slate-800 tracking-tight">
          Account Settings
        </h1>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col space-y-6"
        >
          {/* User Bio Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-sm flex items-start gap-4">
            <Avatar name={user?.fullName || 'User'} size="lg" />
            <div className="pt-2">
              <h2 className="text-[16px] font-bold text-slate-800 leading-tight mb-1">
                {user?.fullName || 'Marry Doe'}
              </h2>
              <p className="text-[13px] text-slate-400 font-semibold tracking-wide lowercase">
                {user?.email || 'marry@gmail.com'}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-sm space-y-3">
            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              About
            </h3>
            <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
            </p>
          </div>

          {/* Additional details */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-sm space-y-4">
            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[11px] font-bold text-slate-400">Phone</span>
                <span className="text-[13px] font-semibold text-slate-700">{user?.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400">Company</span>
                <span className="text-[13px] font-semibold text-slate-700">{user?.company || 'Not provided'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400">Is Agency?</span>
                <span className="text-[13px] font-semibold text-slate-700 capitalize">{user?.agency || 'No'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400">Account ID</span>
                <span className="text-[13px] font-mono text-slate-500 text-xs">#{user?.id || '000000'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Area with Logout Action */}
      <div className="bg-white px-6 py-5 border-t border-slate-100/80 shrink-0">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleLogout}
          className="w-full py-3.5 px-4 font-bold text-[14px] text-red-500 bg-red-50/70 hover:bg-red-100/60 rounded-xl transition-colors focus:outline-none focus:ring-0 cursor-pointer text-center"
        >
          Logout
        </motion.button>
      </div>
    </div>
  );
};
