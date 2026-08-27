import React from 'react';
import { Home, Compass, Dumbbell, TrendingUp, Trophy } from 'lucide-react';

export type FitnessTab = 'dashboard' | 'journey' | 'workouts' | 'evolution' | 'achievements';

interface BottomNavProps {
  activeTab: FitnessTab;
  onChangeTab: (tab: FitnessTab) => void;
  pendingMissionsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  pendingMissionsCount,
}) => {
  const tabs = [
    {
      id: 'dashboard' as FitnessTab,
      label: 'Início',
      icon: Home,
      badge: pendingMissionsCount > 0 ? pendingMissionsCount : undefined,
    },
    {
      id: 'journey' as FitnessTab,
      label: 'Jornada',
      icon: Compass,
    },
    {
      id: 'workouts' as FitnessTab,
      label: 'Treinos',
      icon: Dumbbell,
    },
    {
      id: 'evolution' as FitnessTab,
      label: 'Evolução',
      icon: TrendingUp,
    },
    {
      id: 'achievements' as FitnessTab,
      label: 'Conquistas',
      icon: Trophy,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 sm:py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`fitness-nav-tab-${tab.id}`}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1.5 rounded-xl transition-colors ${
                    isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {tab.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
