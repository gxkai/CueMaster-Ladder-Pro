
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'ladder', label: 'Ladder', icon: '🏆' },
    { id: 'matches', label: 'Matches', icon: '🎱' },
    { id: 'coach', label: 'AI Coach', icon: '🧠' },
    { id: 'profile', label: 'My Stats', icon: '👤' },
  ];

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-emerald-500/20">
              CM
            </div>
            <span className="text-xl font-oswald uppercase tracking-wider font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              CueMaster
            </span>
          </div>
          <div className="hidden md:flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="md:hidden flex space-x-6 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center min-w-[50px] ${
                  activeTab === tab.id ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-[10px] uppercase font-bold mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
