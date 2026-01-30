
export enum GameType {
  EIGHT_BALL = '8-Ball',
  NINE_BALL = '9-Ball',
  SNOOKER = 'Snooker'
}

export enum RankTier {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum',
  DIAMOND = 'Diamond'
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  points: number;
  winCount: number;
  lossCount: number;
  streak: number;
  tier: RankTier;
  joinDate: string;
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  score1: number;
  score2: number;
  gameType: GameType;
  timestamp: string;
  winnerId: string;
}

export interface AppState {
  players: Player[];
  matches: Match[];
}
