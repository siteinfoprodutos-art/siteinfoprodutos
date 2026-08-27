import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  Crown, 
  Flame, 
  Award, 
  Footprints, 
  Dumbbell, 
  Scale, 
  Camera, 
  Medal, 
  CheckCircle2, 
  Lock,
  Zap,
  Target
} from 'lucide-react';
import { FitnessState } from '../types';
import { calculateLevel, LEVEL_TITLES } from '../services/gamificationEngine';

interface AchievementsViewProps {
  state: FitnessState;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ state }) => {
  const levelInfo = calculateLevel(state.xp);
  const achievements = state.achievements;
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  const iconMap: { [key: string]: React.ElementType } = {
    Footprints,
    Dumbbell,
    Flame,
    Trophy,
    Medal,
    Scale,
    Crown,
    Camera,
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* 1. HERO LEVEL CARD */}
      <div className="bg-gradient-to-br from-[#12192c] via-[#0d1322] to-[#080d18] border border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-indigo-400" />
              Nível {levelInfo.level}
            </span>
            <span className="text-xs font-bold text-amber-400">
              {state.xp} XP Total
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{levelInfo.title}</h1>
            <p className="text-xs text-slate-400 mt-1">
              Faltam {levelInfo.xpForNextLevel - levelInfo.currentLevelXp} XP para desbloquear o Nível {levelInfo.level + 1} (
              {LEVEL_TITLES[levelInfo.level + 1] || 'Próximo Nível'})
            </p>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>{levelInfo.currentLevelXp} XP</span>
              <span>{levelInfo.xpForNextLevel} XP ({levelInfo.progressPercent}%)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. DESAFIOS EM ANDAMENTO */}
      <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Desafios Ativos</h3>
              <p className="text-[11px] text-slate-400">Supere limites e ganhe grandes bônus de XP</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.challenges.map((c) => {
            const progressPct = Math.min(100, Math.round((c.currentDays / c.targetDays) * 100));

            return (
              <div
                key={c.id}
                className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-black text-white">{c.title}</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400">
                    +{c.xpReward} XP
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{c.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>Progresso</span>
                    <span>{c.currentDays}/{c.targetDays}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. GALERIA DE CONQUISTAS / BADGES */}
      <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Medalhas de Conquista</h3>
              <p className="text-[11px] text-slate-400">
                {unlockedCount} de {achievements.length} medalhas desbloqueadas
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            const isUnlocked = item.isUnlocked || (item.id === 'first-step' && state.workoutHistory.length >= 1);

            return (
              <div
                key={item.id}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isUnlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs font-black truncate ${
                        isUnlocked ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                      +{item.xpReward} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
