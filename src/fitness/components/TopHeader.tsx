import React from 'react';
import { Flame, Sparkles, Settings, ArrowLeft, Dumbbell } from 'lucide-react';
import { UserFitnessProfile } from '../types';
import { calculateLevel } from '../services/gamificationEngine';

interface TopHeaderProps {
  profile: UserFitnessProfile;
  xp: number;
  streakDays: number;
  onOpenSettings: () => void;
  onBackToStore: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  xp,
  streakDays,
  onOpenSettings,
  onBackToStore,
}) => {
  const levelInfo = calculateLevel(xp);

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Store link & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStore}
            id="fitness-back-store-btn"
            title="Voltar para a AL Studio Tech"
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-wider text-white">AL FITNESS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  EVO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[130px] sm:max-w-xs">
                {profile.name || 'Atleta'} • {levelInfo.title}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Streak, Level & Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Badge */}
          <div
            id="fitness-streak-badge"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold shadow-sm"
          >
            <Flame className="w-4 h-4 text-orange-500 animate-pulse fill-orange-500" />
            <span>{streakDays} {streakDays === 1 ? 'dia' : 'dias'}</span>
          </div>

          {/* Level Pill */}
          <div
            id="fitness-level-pill"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Nível {levelInfo.level}</span>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            id="fitness-settings-btn"
            title="Configurações e Perfil"
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Global XP Progress Strip */}
      <div className="max-w-4xl mx-auto mt-2 pt-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-medium">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="font-bold">Nvl {levelInfo.level}</span> ({xp} XP)
          </span>
          <span>Próximo Nível: {levelInfo.currentLevelXp} / {levelInfo.xpForNextLevel} XP</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
