
import React from 'react';
import { Match, UserProfile, Message } from '../types';

interface MessagesViewProps {
  matches: Match[];
  allUsers: UserProfile[];
  messages: Message[];
  onSelectChat: (userId: string) => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({ matches, allUsers, messages, onSelectChat }) => {
  const getMatchUser = (match: Match) => {
    const otherId = match.userIds.find(id => id !== 'me');
    return allUsers.find(u => u.id === otherId);
  };

  const getLastMessage = (userId: string) => {
    const userMsgs = messages.filter(m => m.senderId === userId || m.receiverId === userId);
    return userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].text : 'Start chatting!';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      
      {matches.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h3 className="font-semibold text-slate-800">No matches yet</h3>
          <p className="text-slate-400 text-sm">Keep discovering to find your people!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">New Matches</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {matches.map(m => {
                const user = getMatchUser(m);
                if (!user) return null;
                return (
                  <button 
                    key={m.id}
                    onClick={() => onSelectChat(user.id)}
                    className="flex-shrink-0 flex flex-col items-center gap-1"
                  >
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-blue-400">
                      <img src={user.photos[0]} className="w-full h-full object-cover rounded-full border-2 border-white" alt="" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{user.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Conversations</h3>
            <div className="divide-y divide-slate-50">
              {matches.map(m => {
                const user = getMatchUser(m);
                if (!user) return null;
                return (
                  <button 
                    key={m.id} 
                    onClick={() => onSelectChat(user.id)}
                    className="w-full flex items-center gap-4 py-4 active:bg-slate-50 transition-colors"
                  >
                    <img src={user.photos[0]} className="w-14 h-14 rounded-full object-cover" alt="" />
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-[10px] text-slate-400">Now</span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{getLastMessage(user.id)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesView;
