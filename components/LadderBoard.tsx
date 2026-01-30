
import React from 'react';
import { Player, RankTier } from '../types';

interface LadderBoardProps {
  players: Player[];
}

const getTierColor = (tier: RankTier) => {
  switch (tier) {
    case RankTier.DIAMOND: return 'from-cyan-400 to-blue-500';
    case RankTier.PLATINUM: return 'from-indigo-400 to-purple-500';
    case RankTier.GOLD: return 'from-yellow-400 to-orange-500';
    case RankTier.SILVER: return 'from-slate-300 to-slate-500';
    case RankTier.BRONZE: return 'from-amber-700 to-amber-900';
    default: return 'from-slate-400 to-slate-600';
  }
};

const LadderBoard: React.FC<LadderBoardProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-oswald uppercase tracking-tight text-white flex items-center">
          <span className="bg-emerald-500 w-2 h-8 mr-3 rounded-full"></span>
          Global Rankings
        </h2>
        <div className="text-slate-400 text-sm">
          Updated live • {players.length} Total Players
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Player</th>
              <th className="px-6 py-4">Tier</th>
              <th className="px-6 py-4 text-center">Record</th>
              <th className="px-6 py-4 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedPlayers.map((player, index) => (
              <tr 
                key={player.id} 
                className="hover:bg-slate-700/30 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-500 ring-1 ring-yellow-500/50' :
                    index === 1 ? 'bg-slate-300/20 text-slate-300 ring-1 ring-slate-300/50' :
                    index === 2 ? 'bg-amber-700/20 text-amber-700 ring-1 ring-amber-700/50' :
                    'text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={player.avatar} 
                      alt={player.name} 
                      className="w-10 h-10 rounded-full border border-slate-700 group-hover:border-emerald-500 transition-colors"
                    />
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{player.name}</div>
                      <div className="text-xs text-slate-500">Joined {player.joinDate}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white bg-gradient-to-br ${getTierColor(player.tier)}`}>
                    {player.tier}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-medium text-slate-300">
                    <span className="text-emerald-400">{player.winCount}W</span>
                    <span className="mx-1 text-slate-600">/</span>
                    <span className="text-rose-400">{player.lossCount}L</span>
                  </div>
                  <div className={`text-[10px] ${player.streak > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {player.streak > 0 ? `🔥 ${player.streak} Streak` : `${player.streak} Streak`}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="text-lg font-bold font-oswald text-emerald-400 tracking-wide">
                    {player.points.toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LadderBoard;
