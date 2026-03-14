export type SkillLevel = 'anfaenger' | 'fortgeschritten' | 'experte' | 'profi';

export interface Player {
  id: string;
  name: string;
  username: string;
  elo: number;
  level: number;
  rank: number;
  winRate: number;
  matchCount: number;
  wins: number;
  losses: number;
  courtCount: number;
  location: string;
  skillLevel: SkillLevel;
  avatarColor: string;
}

export interface Court {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: number;
  latitude: number;
  longitude: number;
  ownerId: string | null;
  ownerName: string | null;
  ownerElo: number | null;
  winStreak: number;
  isPremium: boolean;
  surface: 'hart' | 'sand' | 'rasen';
  rating: number;
  liveMatches: number;
  recentMatches: MatchResult[];
}

export interface Challenge {
  id: string;
  fromPlayer: Player;
  toPlayer: Player;
  court: Court;
  proposedTime: string;
  status: 'ausstehend' | 'angenommen' | 'laufend' | 'abgelehnt';
  createdAt: string;
}

export interface MatchResult {
  id: string;
  player1: Player;
  player2: Player;
  score: string;
  date: string;
  courtId: string;
  courtName: string;
  confirmed: boolean;
  eloChange1: number;
  eloChange2: number;
}

export interface Notification {
  id: string;
  type: 'herausforderung' | 'ergebnis' | 'platz_erobert' | 'neuer_spieler' | 'elo_aenderung';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

export interface RankingEntry {
  rank: number;
  player: Player;
  eloChange: number;
  isMe: boolean;
}
