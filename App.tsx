import React, { useState } from 'react';

import RegisterView from './views/RegisterView';
import DiscoveryView from './views/DiscoveryView';
import MessagesView from './views/MessagesView';
import ChatRoomView from './views/ChatRoomView';
import ProfileView from './views/ProfileView';
import BottomNav from './components/BottomNav';

type ViewState =
  | 'register'
  | 'discovery'
  | 'messages'
  | 'chat'
  | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('register');

  return (
    <div style={{ padding: 20 }}>
      {view === 'register' && <RegisterView />}
      {view === 'discovery' && <DiscoveryView />}
      {view === 'messages' && <MessagesView />}
      {view === 'chat' && <ChatRoomView />}
      {view === 'profile' && <ProfileView />}

      <BottomNav
        activeTab={view}
        onTabChange={(v: string) => setView(v as ViewState)}
      />
    </div>
  );
};

export default App;
