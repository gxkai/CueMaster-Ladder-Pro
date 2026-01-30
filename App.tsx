
import React, { useState, useEffect } from 'react';
import { Player, Match, AppState, RankTier } from './types';
import { INITIAL_PLAYERS } from './constants';
import Navbar from './components/Navbar';
import LadderBoard from './components/LadderBoard';
import MatchRecorder from './components/MatchRecorder';
import AiCoach from './components/AiCoach';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ladder');
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('cuemaster_state');
    return saved ? JSON.parse(saved) : { players: INITIAL_PLAYERS, matches: [] };
  });

  useEffect(() => {
    localStorage.setItem('cuemaster_state', JSON.stringify(state));
  }, [state]);

  const addMatch = (newMatch: Omit<Match, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().toISOString();
    const match: Match = { ...newMatch, id, timestamp };

    setState(prev => {
      const updatedPlayers = prev.players.map(player => {
        if (player.id === match.player1Id || player.id === match.player2Id) {
          const isWinner = player.id === match.winnerId;
          const pointChange = isWinner ? 50 : -30;
          const newPoints = Math.max(0, player.points + pointChange);
          
          // Simple Tier Calculation
          let newTier = player.tier;
          if (newPoints >= 2400) newTier = RankTier.DIAMOND;
          else if (newPoints >= 2000) newTier = RankTier.PLATINUM;
          else if (newPoints >= 1600) newTier = RankTier.GOLD;
          else if (newPoints >= 1200) newTier = RankTier.SILVER;
          else newTier = RankTier.BRONZE;

          return {
            ...player,
            points: newPoints,
            winCount: player.winCount + (isWinner ? 1 : 0),
            lossCount: player.lossCount + (isWinner ? 0 : 1),
            streak: isWinner ? (player.streak > 0 ? player.streak + 1 : 1) : (player.streak < 0 ? player.streak - 1 : -1),
            tier: newTier
          };
        }
        return player;
      });

      return {
        players: updatedPlayers,
        matches: [match, ...prev.matches]
      };
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ladder':
        return (
          <div className="space-y-10 animate-fade-in">
            <LadderBoard players={state.players} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-oswald uppercase text-white mb-4">Win Probability Trends</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={state.players.slice(0, 5).map(p => ({ name: p.name, points: p.points }))}>
                      <defs>
                        <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="points" stroke="#10b981" fillOpacity={1} fill="url(#colorPoints)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <MatchRecorder players={state.players} onAddMatch={addMatch} />
            </div>
          </div>
        );
      case 'matches':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-oswald uppercase text-white">Recent Match History</h2>
            {state.matches.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-500">No matches recorded yet. Hit the tables!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.matches.map(m => {
                  const p1 = state.players.find(p => p.id === m.player1Id);
                  const p2 = state.players.find(p => p.id === m.player2Id);
                  return (
                    <div key={m.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center space-x-4 w-1/3">
                        <img src={p1?.avatar} className="w-10 h-10 rounded-full" alt="" />
                        <span className={`font-bold ${m.winnerId === m.player1Id ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {p1?.name}
                        </span>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                        <span className="text-2xl font-oswald font-bold tracking-widest text-white">
                          {m.score1} - {m.score2}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full mt-1">
                          {m.gameType}
                        </span>
                      </div>
                      <div className="flex items-center justify-end space-x-4 w-1/3">
                        <span className={`font-bold ${m.winnerId === m.player2Id ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {p2?.name}
                        </span>
                        <img src={p2?.avatar} className="w-10 h-10 rounded-full" alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 'coach':
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <AiCoach player={state.players[0]} />
          </div>
        );
      case 'profile':
        const me = state.players[0]; // Assuming user is always the first one for demo
        return (
          <div className="animate-fade-in">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl overflow-hidden relative">
               <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
                 <div className="relative">
                    <img src={me.avatar} className="w-32 h-32 rounded-3xl ring-4 ring-emerald-500/20" alt={me.name} />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                      ACTIVE
                    </div>
                 </div>
                 <div className="text-center md:text-left">
                    <h2 className="text-4xl font-oswald uppercase text-white tracking-wide">{me.name}</h2>
                    <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                       <span className="text-slate-400 text-sm">Member since {me.joinDate}</span>
                       <span className="px-3 py-1 rounded-full bg-slate-700 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                         {me.tier} Tier
                       </span>
                    </div>
                    <div className="grid grid-cols-3 gap-8 mt-8">
                       <div>
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Ranking Points</div>
                          <div className="text-2xl font-oswald text-white">{me.points}</div>
                       </div>
                       <div>
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Win Rate</div>
                          <div className="text-2xl font-oswald text-white">
                            {Math.round((me.winCount / (me.winCount + me.lossCount)) * 100)}%
                          </div>
                       </div>
                       <div>
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Best Streak</div>
                          <div className="text-2xl font-oswald text-white">🔥 {me.streak}</div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500 selection:text-white pb-20 md:pb-0">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <footer className="hidden md:block py-10 border-t border-slate-900 mt-20 text-center">
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} CueMaster Ladder Pro. Designed for champions.
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
