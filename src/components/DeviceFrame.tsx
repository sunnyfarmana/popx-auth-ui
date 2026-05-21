import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // 12-hour format
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 sm:p-6 bg-radial from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:to-black transition-colors duration-500 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-7000"></div>

      {/* Smartphone frame container */}
      <div className="relative w-full h-screen sm:w-[412px] sm:h-[844px] sm:rounded-[48px] sm:border-[12px] sm:border-slate-950 sm:bg-slate-950 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_4px_12px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden transition-all duration-300 ease-out z-10">
        
        {/* Dynamic Island / Camera Notch (Only shown on Desktop Frame) */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-50 flex items-center justify-between px-3 border border-slate-900/50 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900/80 border border-slate-800/40"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-950/90 ml-auto border border-blue-900/30"></div>
        </div>

        {/* Status Bar */}
        <div className="w-full h-11 bg-white dark:bg-slate-950 flex items-center justify-between px-6 select-none z-40 shrink-0 border-b border-slate-50/50 dark:border-slate-900/10">
          {/* Time Display */}
          <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
            {time}
          </span>

          {/* Network, Wifi, Battery Status */}
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Signal size={14} className="stroke-[2.5]" />
            <Wifi size={14} className="stroke-[2.5]" />
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold">100%</span>
              <Battery size={16} className="stroke-[2.5] rotate-0" />
            </div>
          </div>
        </div>

        {/* Content Container (Simulated Screen Viewport) */}
        <div className="flex-1 w-full overflow-hidden bg-slate-50 dark:bg-slate-900 relative flex flex-col">
          {children}
        </div>

        {/* Simulated iOS Home Indicator (Only shown on Desktop Frame) */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800 dark:bg-slate-300 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
