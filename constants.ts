
import { RankTier, Player, GameType } from './types';

export const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'Jimmy "Whirlwind"', avatar: 'https://picsum.photos/seed/p1/100/100', points: 2450, winCount: 45, lossCount: 12, streak: 5, tier: RankTier.DIAMOND, joinDate: '2023-01-15' },
  { id: '2', name: 'Sarah "The Shark"', avatar: 'https://picsum.photos/seed/p2/100/100', points: 2100, winCount: 38, lossCount: 15, streak: 2, tier: RankTier.PLATINUM, joinDate: '2023-02-10' },
  { id: '3', name: 'Chen Wei', avatar: 'https://picsum.photos/seed/p3/100/100', points: 1850, winCount: 30, lossCount: 20, streak: -1, tier: RankTier.GOLD, joinDate: '2023-03-05' },
  { id: '4', name: 'Dave B.', avatar: 'https://picsum.photos/seed/p4/100/100', points: 1600, winCount: 22, lossCount: 18, streak: 1, tier: RankTier.SILVER, joinDate: '2023-05-12' },
  { id: '5', name: 'Elena R.', avatar: 'https://picsum.photos/seed/p5/100/100', points: 1200, winCount: 15, lossCount: 25, streak: -3, tier: RankTier.BRONZE, joinDate: '2023-06-20' },
];

export const GAME_TYPES = Object.values(GameType);
