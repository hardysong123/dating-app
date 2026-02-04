
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Message } from '../types';
import { checkMessageSafety } from '../services/geminiService';

interface ChatRoomViewProps {
  user: UserProfile;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

const ChatRoomView: React.FC<ChatRoomViewProps> = ({ user, messages, onSendMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [checking, setChecking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    setChecking(true);
    const safety = await checkMessageSafety(inputText);
    setChecking(false);

    if (safety.safe) {
      onSendMessage(inputText);
      setInputText('');
    } else {
      alert(`Safety Alert: ${safety.reason || "This message might be inappropriate. Let's keep the community safe."}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <header className="px-4 py-3 flex items-center border-b border-slate-100 gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <img src={user.photos[0]} className="w-10 h-10 rounded-full object-cover" alt="" />
        <div className="flex-1 overflow-hidden">
          <h4 className="font-bold truncate">{user.name}</h4>
          <p className="text-[10px] text-pink-500 font-medium uppercase tracking-wider">Online</p>
        </div>
        <button className="p-2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => {
          const isMe = m.senderId === 'me';
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                isMe ? 'bg-slate-900 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 pb-8 bg-white">
        <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-1">
          <input 
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-3 text-sm outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={checking || !inputText.trim()}
            className="p-2 text-pink-500 disabled:opacity-30"
          >
            {checking ? (
              <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            )}
          </button>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 text-center italic">
          ✨ Messages are scanned by AI to ensure community safety.
        </div>
      </div>
    </div>
  );
};

export default ChatRoomView;
