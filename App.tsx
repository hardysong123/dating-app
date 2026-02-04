import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, ViewState, Message, Match } from './types';
import { MOCK_USERS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [swipedUserIds, setSwipedUserIds] = useState<Set<string>>(new Set());
  const [maxDistance, setMaxDistance] = useState<number>(10);

  useEffect(() => {
    const savedUser = localStorage.getItem('transunity_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setView('discovery');
    }
  }, []);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(
      u => !swipedUserIds.has(u.id) && (u.distance || 0) <= maxDistance
    );
  }, [swipedUserIds, maxDistance]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dating App is running 🚀</h1>
      <p>Netlify deploy works</p>
      <p>Status: stable build</p>
    </div>
  );
};

export default App;
