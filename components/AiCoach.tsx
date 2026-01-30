
import React, { useState } from 'react';
import { Player } from '../types';
import { geminiService } from '../services/geminiService';

interface AiCoachProps {
  player: Player;
}

const AiCoach: React.FC<AiCoachProps> = ({ player }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const performance = `${player.winCount} wins, ${player.lossCount} losses, ${player.streak} current streak, ranked as ${player.tier}.`;
    const result = await geminiService.getCoachAdvice(player.name, performance);
    setAdvice(result || "The coach is busy analyzing patterns. Please try again.");
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
            🤖
          </div>
          <div>
            <h2 className="text-2xl font-oswald uppercase text-white tracking-tight">Personal AI Coach</h2>
            <p className="text-slate-400 text-sm">Tailored advice based on your current ladder standing</p>
          </div>
        </div>

        {!advice ? (
          <div className="text-center py-10 space-y-6">
            <div className="max-w-md mx-auto">
              <p className="text-slate-300 text-lg mb-6">
                Ready to elevate your game, <span className="text-emerald-400 font-bold">{player.name}</span>? 
                Our AI analyzes your match history to provide professional-grade insights.
              </p>
              <button
                onClick={handleGetAdvice}
                disabled={loading}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-emerald-500 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Performance...
                  </span>
                ) : (
                  "Get Professional Advice"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="prose prose-invert max-w-none">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20 whitespace-pre-wrap text-slate-200 leading-relaxed font-medium">
                {advice}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setAdvice(null)}
                className="text-emerald-400 text-sm font-bold uppercase tracking-widest hover:text-emerald-300 transition-colors"
              >
                ← Get New Advice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiCoach;
