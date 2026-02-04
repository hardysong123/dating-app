
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  pronouns: string;
  bio: string;
  photos: string[];
  distance?: number;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

export interface Match {
  id: string;
  userIds: [string, string];
  lastMessage?: string;
  timestamp: number;
}

export type ViewState = 'landing' | 'register' | 'discovery' | 'messages' | 'chat' | 'profile';
