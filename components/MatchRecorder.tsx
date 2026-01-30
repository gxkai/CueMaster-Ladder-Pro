
import React, { useState } from 'react';
import { Player, GameType, Match } from '../types';
import { GAME_TYPES } from '../constants';

interface MatchRecorderProps {
  players: Player[];
  onAddMatch: (match: Omit<Match, 'id' | 'timestamp'>) => void;
}

const MatchRecorder: React.FC<MatchRecorderProps> = ({ players, onAddMatch }) => {
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameType, setGameType] = useState<GameType>(GameType.EIGHT_BALL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!player1Id || !player2Id || player1Id === player2Id) {
      alert("Please select two different players");
      return;
    }

    onAddMatch({
      player1Id,
      player2Id,
      score1,
      score2,
      gameType,
      winnerId: score1 > score2 ? player1Id : player2Id
    });

    // Reset
    setScore1(0);
    setScore2(0);
    setPlayer1Id('');
    setPlayer2Id('');
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
      <h2 className="text-xl font-oswald uppercase tracking-tight text-white mb-6 flex items-center">
        <span className="bg-blue-500 w-2 h-6 mr-3 rounded-full"></span>
        Submit Match Result
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Player 1 Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-400 uppercase tracking-wider">Player 1</label>
            <select 
              value={player1Id}
              onChange={(e) => setPlayer1Id(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              required
            >
              <option value="">Select Player</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-slate-400">Score:</label>
              <input 
                type="number" 
                min="0" 
                value={score1}
                onChange={(e) => setScore1(parseInt(e.target.value) || 0)}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Player 2 Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-400 uppercase tracking-wider">Player 2</label>
            <select 
              value={player2Id}
              onChange={(e) => setPlayer2Id(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              required
            >
              <option value="">Select Player</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-slate-400">Score:</label>
              <input 
                type="number" 
                min="0" 
                value={score2}
                onChange={(e) => setScore2(parseInt(e.target.value) || 0)}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400 uppercase font-bold tracking-tight">Game Mode:</span>
            <div className="flex space-x-2">
              {GAME_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setGameType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    gameType === type 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transform transition-all active:scale-95"
          >
            Submit Match
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchRecorder;
