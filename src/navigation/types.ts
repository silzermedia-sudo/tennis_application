export type RootStackParamList = {
  Onboarding: undefined;
  SkillSelection: undefined;
  MainTabs: undefined;
  CourtDetail: { courtId: string };
  Challenge: { playerId?: string; courtId?: string; challengeId?: string };
  MatchResult: { matchId?: string; challengeId?: string };
  PlayerProfile: { playerId: string };
};

export type MainTabsParamList = {
  Home: undefined;
  Map: undefined;
  ChallengeTab: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};
