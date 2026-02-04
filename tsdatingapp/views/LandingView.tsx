
import React from 'react';

interface LandingViewProps {
  onGetStarted: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onGetStarted }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#5BCEFA] via-white to-[#F5A9B8]">
      <div className="bg-white/40 p-1 rounded-full mb-6">
        <div className="bg-white p-6 rounded-full shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5BCEFA" />
                <stop offset="100%" stopColor="#F5A9B8" />
              </linearGradient>
            </defs>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-slate-800 mb-2">TransUnity</h1>
      <p className="text-slate-600 text-center mb-12 max-w-[280px]">
        A safe space for Trans & Non-binary folks to find love and community.
      </p>
      
      <div className="w-full space-y-4">
        <button 
          onClick={onGetStarted}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <p className="text-xs text-slate-500 text-center">
          By continuing, you agree to our terms of safety and inclusion.
        </p>
      </div>
    </div>
  );
};

export default LandingView;
