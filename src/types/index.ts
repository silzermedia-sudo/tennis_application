export interface Player {
  id: string;
  username: string;
  name: string;
  avatar: string;
  elo: number;
  level: number;
  worldRank: number;
  winRate: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
  location: string;
  memberSince: string;
  skillLevel: 'Anfänger' | 'Fortgeschrittener' | 'Geübt' | 'Profi';
  ownedCourts: string[];
  winStreak: number;
  badge?: string;
}

export interface Court {
  id: string;
  name: string;
  location: string;
  city: string;
  distance: string;
  latitude: number;
  longitude: number;
  currentOwner: Player | null;
  ownerStreak: number;
  isPremiumHub: boolean;
  surface: 'Hart' | 'Sand' | 'Gras';
  recentMatches: Match[];
  rating: number;
  livePlaying: boolean;
}

export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  score: string;
  date: string;
  courtId: string;
  winner: Player;
  format: string;
  eloChange: number;
}

export interface Challenge {
  id: string;
  challenger: Player;
  opponent: Player;
  court: Court;
  proposedTime: string;
  status: 'Offen' | 'Angenommen' | 'Abgelehnt' | 'Läuft';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'challenge' | 'match_result' | 'court_conquered' | 'new_player' | 'elo_change';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export type SkillLevel = 'Anfänger' | 'Fortgeschrittener' | 'Geübt' | 'Profi';
