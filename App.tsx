
import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, ViewState, Message, Match } from './types';
import { MOCK_USERS } from './constants';
import RegisterView from './views/RegisterView';
import DiscoveryView from './views/DiscoveryView';
import MessagesView from './views/MessagesView';
import ChatRoomView from './views/ChatRoomView';
import ProfileView from './views/ProfileView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [swipedUserIds, setSwipedUserIds] = useState<Set<string>>(new Set());
  const [maxDistance, setMaxDistance] = useState<number>(10); // Default 10km

  // Initialize from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('transunity_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setView('discovery');
    }
  }, []);

  const handleRegister = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('transunity_user', JSON.stringify(user));
    setView('discovery');
  };

  const handleMatch = (userId: string) => {
    const matchedUser = MOCK_USERS.find(u => u.id === userId);
    if (!matchedUser) return;

    const newMatch: Match = {
      id: `match_${Date.now()}`,
      userIds: [currentUser?.id || 'me', userId],
      timestamp: Date.now()
    };
    
    setMatches(prev => [newMatch, ...prev]);
    setSwipedUserIds(prev => new Set(prev).add(userId));
    
    // Auto-message for demo
    const greeting: Message = {
      id: `msg_${Date.now()}`,
      senderId: userId,
      receiverId: currentUser?.id || 'me',
      text: `Hi ${currentUser?.name}! I saw we matched. I love your profile!`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, greeting]);
  };

  const handleSwipeLeft = (userId: string) => {
    setSwipedUserIds(prev => new Set(prev).add(userId));
  };

  const openChat = (userId: string) => {
    setActiveChatUserId(userId);
    setView('chat');
  };

  const sendMessage = (text: string) => {
    if (!currentUser || !activeChatUserId) return;
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeChatUserId,
      text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const logout = () => {
    localStorage.removeItem('transunity_user');
    setCurrentUser(null);
    setView('landing');
  };

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(u => 
      !swipedUserIds.has(u.id) && 
      (u.distance || 0) <= maxDistance
    );
  }, [swipedUserIds, maxDistance]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dating App is running 🚀</h1>
      <p>Netlify deploy works</p>
    </div>
  );

export default App;
