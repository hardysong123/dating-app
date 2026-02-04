
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 flex justify-around py-3 px-2 safe-padding z-50">
      <button 
        onClick={() => onTabChange('discovery')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'discovery' ? 'text-pink-500' : 'text-slate-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>
        <span className="text-[10px] font-medium">Discover</span>
      </button>
      
      <button 
        onClick={() => onTabChange('messages')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-pink-500' : 'text-slate-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        <span className="text-[10px] font-medium">Messages</span>
      </button>
      
      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-pink-500' : 'text-slate-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
