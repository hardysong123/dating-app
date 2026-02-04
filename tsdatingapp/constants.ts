
import { UserProfile } from './types';

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Alex',
    age: 24,
    gender: 'Non-binary',
    pronouns: 'They/Them',
    bio: 'Artist and cat lover. Always looking for new galleries to visit! 🎨',
    photos: ['https://picsum.photos/seed/alex/400/600'],
    distance: 2.5
  },
  {
    id: 'u2',
    name: 'Jamie',
    age: 28,
    gender: 'Transmasculine',
    pronouns: 'He/Him',
    bio: 'Outdoor enthusiast and weekend hiker. Let\'s find a trail together.',
    photos: ['https://picsum.photos/seed/jamie/400/600'],
    distance: 0.8
  },
  {
    id: 'u3',
    name: 'Sarah',
    age: 22,
    gender: 'Transfeminine',
    pronouns: 'She/Her',
    bio: 'Coding by day, gaming by night. Big fan of indie RPGs and tea.',
    photos: ['https://picsum.photos/seed/sarah/400/600'],
    distance: 4.1
  },
  {
    id: 'u4',
    name: 'Riley',
    age: 26,
    gender: 'Genderqueer',
    pronouns: 'She/They',
    bio: 'Photography student living for that perfect golden hour light.',
    photos: ['https://picsum.photos/seed/riley/400/600'],
    distance: 1.2
  }
];

export const TRANS_COLORS = {
  blue: '#5BCEFA',
  pink: '#F5A9B8',
  white: '#FFFFFF'
};
