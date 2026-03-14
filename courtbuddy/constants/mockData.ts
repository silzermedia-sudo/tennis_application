import type { Player, Court, Challenge, MatchResult, Notification, RankingEntry } from '../types';

export const ME: Player = {
  id: 'me',
  name: 'Alex Volkov',
  username: 'AlexV_Vienna',
  elo: 1580,
  level: 42,
  rank: 248,
  winRate: 68,
  matchCount: 42,
  wins: 29,
  losses: 13,
  courtCount: 3,
  location: 'Wien, Österreich',
  skillLevel: 'fortgeschritten',
  avatarColor: '#00FF87',
};

export const PLAYERS: Player[] = [
  {
    id: 'p1', name: 'Sam Smash', username: 'SamSmash', elo: 1480, level: 35,
    rank: 312, winRate: 75, matchCount: 24, wins: 18, losses: 6,
    courtCount: 1, location: 'München, Deutschland', skillLevel: 'fortgeschritten', avatarColor: '#FF6B6B',
  },
  {
    id: 'p2', name: 'Tina Topspin', username: 'Tina_T', elo: 1550, level: 38,
    rank: 267, winRate: 62, matchCount: 31, wins: 19, losses: 12,
    courtCount: 2, location: 'Wien, Österreich', skillLevel: 'experte', avatarColor: '#4FC3F7',
  },
  {
    id: 'p3', name: 'Lob König', username: 'LobKing', elo: 1420, level: 28,
    rank: 389, winRate: 55, matchCount: 18, wins: 10, losses: 8,
    courtCount: 0, location: 'Zürich, Schweiz', skillLevel: 'fortgeschritten', avatarColor: '#FFB74D',
  },
  {
    id: 'p4', name: 'Rafa Pro', username: 'Rafa_Pro', elo: 2150, level: 87,
    rank: 1, winRate: 91, matchCount: 142, wins: 129, losses: 13,
    courtCount: 8, location: 'Berlin, Deutschland', skillLevel: 'profi', avatarColor: '#CE93D8',
  },
  {
    id: 'p5', name: 'Elena Backhand', username: 'Elena_B', elo: 2650, level: 95,
    rank: 4, winRate: 88, matchCount: 201, wins: 177, losses: 24,
    courtCount: 12, location: 'Hamburg, Deutschland', skillLevel: 'profi', avatarColor: '#80DEEA',
  },
  {
    id: 'p6', name: 'TopSpin Tom', username: 'TopSpin_Tom', elo: 2590, level: 91,
    rank: 5, winRate: 85, matchCount: 176, wins: 150, losses: 26,
    courtCount: 9, location: 'München, Deutschland', skillLevel: 'profi', avatarColor: '#A5D6A7',
  },
  {
    id: 'p7', name: 'Sarah Serve', username: 'Sarah_Serve', elo: 2545, level: 89,
    rank: 6, winRate: 83, matchCount: 168, wins: 139, losses: 29,
    courtCount: 7, location: 'Frankfurt, Deutschland', skillLevel: 'profi', avatarColor: '#F48FB1',
  },
  {
    id: 'p8', name: 'TheAce_99', username: 'TheAce_99', elo: 3120, level: 99,
    rank: 2, winRate: 94, matchCount: 310, wins: 291, losses: 19,
    courtCount: 15, location: 'Wien, Österreich', skillLevel: 'profi', avatarColor: '#00FF87',
  },
  {
    id: 'p9', name: 'Rafa_X', username: 'Rafa_X', elo: 2840, level: 96,
    rank: 3, winRate: 92, matchCount: 255, wins: 235, losses: 20,
    courtCount: 11, location: 'Zürich, Schweiz', skillLevel: 'profi', avatarColor: '#FFCC02',
  },
];

export const COURTS: Court[] = [
  {
    id: 'c1', name: 'Prater Tennisanlage', address: 'Prater Hauptallee 1',
    city: 'Wien', distance: 0.8, latitude: 48.2082, longitude: 16.4200,
    ownerId: 'p1', ownerName: 'SamSmash', ownerElo: 1480, winStreak: 3,
    isPremium: false, surface: 'sand', rating: 4.5, liveMatches: 1,
    recentMatches: [],
  },
  {
    id: 'c2', name: 'Stadthalle Court Premium', address: 'Roland Roos Platz 1',
    city: 'Wien', distance: 1.2, latitude: 48.1975, longitude: 16.3375,
    ownerId: 'p8', ownerName: 'TheAce_99', ownerElo: 3120, winStreak: 8,
    isPremium: true, surface: 'hart', rating: 4.9, liveMatches: 2,
    recentMatches: [],
  },
  {
    id: 'c3', name: 'Döbling Tennis Club', address: 'Sieveringer Str. 22',
    city: 'Wien', distance: 2.1, latitude: 48.2450, longitude: 16.3600,
    ownerId: null, ownerName: null, ownerElo: null, winStreak: 0,
    isPremium: false, surface: 'sand', rating: 4.2, liveMatches: 0,
    recentMatches: [],
  },
  {
    id: 'c4', name: 'Hernals Outdoor Courts', address: 'Kalvarienberggasse 44',
    city: 'Wien', distance: 3.4, latitude: 48.2220, longitude: 16.3300,
    ownerId: 'me', ownerName: 'AlexV_Vienna', ownerElo: 1580, winStreak: 2,
    isPremium: false, surface: 'hart', rating: 3.8, liveMatches: 0,
    recentMatches: [],
  },
  {
    id: 'c5', name: 'Schönbrunn Tennis', address: 'Schönbrunner Schlossstraße',
    city: 'Wien', distance: 4.0, latitude: 48.1855, longitude: 16.3121,
    ownerId: 'p2', ownerName: 'Tina_T', ownerElo: 1550, winStreak: 5,
    isPremium: true, surface: 'rasen', rating: 4.7, liveMatches: 1,
    recentMatches: [],
  },
];

export const MATCH_RESULTS: MatchResult[] = [
  {
    id: 'm1', player1: ME, player2: PLAYERS[0],
    score: '6-4, 7-5', date: 'Okt 24', courtId: 'c1', courtName: 'Prater Tennisanlage',
    confirmed: true, eloChange1: 24, eloChange2: -24,
  },
  {
    id: 'm2', player1: ME, player2: PLAYERS[1],
    score: '3-6, 4-6', date: 'Okt 17', courtId: 'c2', courtName: 'Stadthalle Court Premium',
    confirmed: true, eloChange1: -18, eloChange2: 18,
  },
  {
    id: 'm3', player1: ME, player2: PLAYERS[2],
    score: '6-1, 6-2', date: 'Okt 10', courtId: 'c4', courtName: 'Hernals Outdoor Courts',
    confirmed: true, eloChange1: 16, eloChange2: -16,
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch1', fromPlayer: PLAYERS[0], toPlayer: ME,
    court: COURTS[0], proposedTime: 'Sa, 12. Okt • 11:30',
    status: 'ausstehend', createdAt: '2m ago',
  },
  {
    id: 'ch2', fromPlayer: PLAYERS[1], toPlayer: ME,
    court: COURTS[1], proposedTime: 'So, 13. Okt • 14:00',
    status: 'laufend', createdAt: '1h ago',
  },
  {
    id: 'ch3', fromPlayer: PLAYERS[2], toPlayer: ME,
    court: COURTS[2], proposedTime: 'Mo, 14. Okt • 09:00',
    status: 'ausstehend', createdAt: '3h ago',
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1', type: 'herausforderung', title: 'Neue Herausforderung erhalten',
    message: 'Von Rafa N. für ein Match auf Center Court',
    timeAgo: '2m', read: false,
  },
  {
    id: 'n2', type: 'ergebnis', title: 'Spielergebnis bestätigt',
    message: 'Du hast gewonnen! +24 ELO',
    timeAgo: '1h', read: false,
  },
  {
    id: 'n3', type: 'platz_erobert', title: 'Platz erobert!',
    message: 'Du bist jetzt Eigentümer von Sunset Park',
    timeAgo: '3h', read: true,
  },
  {
    id: 'n4', type: 'neuer_spieler', title: 'Neuer Spieler in der Nähe',
    message: 'Alex M. hat sich der lokalen Rangliste angeschlossen',
    timeAgo: '5h', read: true,
  },
  {
    id: 'n5', type: 'elo_aenderung', title: 'ELO Änderung',
    message: '-12 ELO aus Match gegen Roger',
    timeAgo: 'Gestern', read: true,
  },
];

export const REGIONAL_RANKING: RankingEntry[] = [
  { rank: 1, player: PLAYERS[7], eloChange: 45, isMe: false },
  { rank: 2, player: PLAYERS[8], eloChange: 22, isMe: false },
  { rank: 3, player: { ...PLAYERS[3], username: 'Marco_V', name: 'Marco Voss', elo: 2715 }, eloChange: 12, isMe: false },
  { rank: 4, player: PLAYERS[4], eloChange: 31, isMe: false },
  { rank: 5, player: PLAYERS[5], eloChange: -8, isMe: false },
  { rank: 6, player: PLAYERS[6], eloChange: 19, isMe: false },
  { rank: 42, player: ME, eloChange: -7, isMe: true },
  { rank: 43, player: { ...PLAYERS[2], username: 'Volley_V', name: 'Volker Voss', elo: 1795 }, eloChange: 5, isMe: false },
];
