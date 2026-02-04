
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface DiscoveryViewProps {
  users: UserProfile[];
  maxDistance: number;
  onDistanceChange: (distance: number) => void;
  onMatch: (userId: string) => void;
  onPass: (userId: string) => void;
}

const DiscoveryView: React.FC<DiscoveryViewProps> = ({ 
  users, 
  maxDistance, 
  onDistanceChange, 
  onMatch, 
  onPass 
}) => {
  const [reportModal, setReportModal] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  
  // Swipe Logic State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const SWIPE_THRESHOLD = 120;
  const currentUser = users[0];

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (exitDirection || !currentUser) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || exitDirection) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handleEnd = () => {
    if (!isDragging || exitDirection) return;
    setIsDragging(false);

    if (dragOffset.x > SWIPE_THRESHOLD) {
      triggerSwipe('right');
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      triggerSwipe('left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const triggerSwipe = (direction: 'left' | 'right') => {
    if (exitDirection) return;
    setExitDirection(direction);
    
    // Animate the card flying off screen
    setDragOffset({ x: direction === 'right' ? 800 : -800, y: 0 });

    setTimeout(() => {
      if (direction === 'right') {
        onMatch(currentUser.id);
      } else {
        onPass(currentUser.id);
      }
      // Reset state for the next user in the queue
      setExitDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 350);
  };

  // Card physics: Rotation follows horizontal drag
  const rotation = dragOffset.x * 0.08; 
  const badgeOpacity = Math.min(Math.abs(dragOffset.x) / 100, 1);

  // Styles for the card
  const cardStyle: React.CSSProperties = {
    transform: `translate(${dragOffset.x}px, ${dragOffset.y * 0.15}px) rotate(${rotation}deg)`,
    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  if (users.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-slate-50">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4 4-4-4"/></svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">No one new nearby</h3>
        <p className="text-slate-500 mb-8 max-w-[240px]">Try increasing your distance filter to see more profiles from the community.</p>
        <button 
          onClick={() => onDistanceChange(50)}
          className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-transform"
        >
          Expand Radius
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 select-none overflow-hidden touch-none">
      {/* Search Filter Header */}
      <div className="p-4 bg-white border-b border-slate-100 z-30 touch-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-black bg-gradient-to-r from-pink-500 via-blue-400 to-pink-500 bg-clip-text text-transparent">Discover</h2>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className={`p-2 rounded-xl transition-all ${showFilter ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="12" x2="14" y2="12"/><line x1="18" y1="16" x2="22" y2="16"/></svg>
          </button>
        </div>
        
        {showFilter && (
          <div className="py-4 animate-slide-up">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Distance Range</span>
              <span className="text-sm font-black text-pink-500 bg-pink-50 px-2 py-0.5 rounded-lg">{maxDistance} km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={maxDistance} 
              onChange={(e) => onDistanceChange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        )}
      </div>

      <div className="flex-1 relative p-4 mb-4 touch-none">
        {/* Background Card (The Stack) */}
        {users.length > 1 && (
          <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden bg-slate-200 shadow-sm border border-slate-200 scale-95 translate-y-2 z-0">
            <img 
              src={users[1].photos[0]} 
              className="w-full h-full object-cover grayscale-[30%]" 
              alt="Next Profile"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Foreground Card (The Swiper) */}
        <div 
          style={cardStyle}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="absolute inset-4 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-white/50 z-10 will-change-transform"
        >
          <img 
            src={currentUser.photos[0]} 
            alt={currentUser.name}
            className="w-full h-full object-cover pointer-events-none select-none"
          />

          {/* Swipe Badges: Like/Nope stamps */}
          <div 
            className="absolute top-12 left-10 border-4 border-green-500 rounded-xl px-4 py-1 rotate-[-20deg] z-20 pointer-events-none transition-opacity"
            style={{ opacity: dragOffset.x > 30 ? badgeOpacity : 0 }}
          >
            <span className="text-4xl font-black text-green-500 uppercase tracking-tighter">LIKE</span>
          </div>
          <div 
            className="absolute top-12 right-10 border-4 border-red-500 rounded-xl px-4 py-1 rotate-[20deg] z-20 pointer-events-none transition-opacity"
            style={{ opacity: dragOffset.x < -30 ? badgeOpacity : 0 }}
          >
            <span className="text-4xl font-black text-red-500 uppercase tracking-tighter">NOPE</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          {/* Card Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
            <div className="flex items-end gap-3 mb-2">
              <h3 className="text-4xl font-black tracking-tight">{currentUser.name}, {currentUser.age}</h3>
              <span className="bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full text-xs font-bold mb-2 border border-white/20">
                {currentUser.distance} km
              </span>
            </div>
            <p className="text-pink-300 font-bold mb-3 tracking-wide">{currentUser.gender} • {currentUser.pronouns}</p>
            <p className="text-slate-200 line-clamp-3 text-sm leading-relaxed mb-6">{currentUser.bio}</p>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setReportModal(currentUser.id); }}
              className="text-white/40 text-[10px] flex items-center gap-1.5 hover:text-white/60 pointer-events-auto bg-black/30 px-3 py-1.5 rounded-full border border-white/5 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
              REPORT PROFILE
            </button>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-8 px-6 pb-8 touch-auto">
        <button 
          onClick={() => triggerSwipe('left')}
          disabled={!!exitDirection}
          className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 active:scale-90 transition-all border border-slate-100 group"
          aria-label="Swipe Left - Pass"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <button 
          onClick={() => triggerSwipe('right')}
          disabled={!!exitDirection}
          className="w-16 h-16 rounded-full bg-slate-900 shadow-xl flex items-center justify-center text-pink-400 hover:text-pink-300 active:scale-90 transition-all group"
          aria-label="Swipe Right - Like"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="group-hover:scale-110 transition-transform"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>

      {/* Safety Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 touch-auto">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 animate-slide-up shadow-2xl border border-slate-100">
            <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto mb-6" />
            <h4 className="text-2xl font-black mb-2 text-slate-800">Report Account</h4>
            <p className="text-slate-500 mb-8 text-sm leading-relaxed">Protecting our community is vital. Please tell us why you are reporting this profile. Reports are 100% confidential.</p>
            <div className="space-y-3">
              {['Harassment or Bullying', 'Fake profile / Scammer', 'Inappropriate content', 'Hate speech'].map(reason => (
                <button 
                  key={reason}
                  onClick={() => {
                    alert('Reported. Our moderators will review this profile immediately.');
                    setReportModal(null);
                    triggerSwipe('left');
                  }}
                  className="w-full text-left p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-slate-100 transition-colors active:scale-98"
                >
                  {reason}
                </button>
              ))}
              <button 
                onClick={() => setReportModal(null)}
                className="w-full py-4 text-slate-400 font-black text-xs uppercase tracking-[0.2em] mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryView;
