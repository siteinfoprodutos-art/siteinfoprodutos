import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Dumbbell, 
  Play, 
  Check, 
  TrendingDown, 
  TrendingUp, 
  Zap, 
  Plus, 
  Award, 
  CheckCircle2, 
  Circle,
  Calendar,
  Scale
} from 'lucide-react';
import { FitnessState, WorkoutRoutine, DailyMission } from '../types';
import { calculateLevel } from '../services/gamificationEngine';

interface DashboardViewProps {
  state: FitnessState;
  onStartWorkout: (routine: WorkoutRoutine) => void;
  onToggleMission: (missionId: string) => void;
  onOpenQuickLog: () => void;
  onNavigateTab: (tab: 'journey' | 'workouts' | 'evolution' | 'achievements') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onStartWorkout,
  onToggleMission,
  onOpenQuickLog,
  onNavigateTab,
}) => {
  const profile = state.profile;
  const levelInfo = calculateLevel(state.xp);
  const nextRoutine = state.routines[0] || null;

  // Weight progress calculations
  const startW = profile.startWeightKg;
  const currentW = state.weightHistory[state.weightHistory.length - 1]?.weightKg || profile.currentWeightKg;
  const targetW = profile.targetWeightKg;
  const isLoss = profile.goal === 'emagrecer';
  const weightDiff = Math.abs(currentW - startW);
  const totalGoalDiff = Math.abs(targetW - startW);
  const goalProgressPercent = totalGoalDiff > 0 ? Math.min(100, Math.round((weightDiff / totalGoalDiff) * 100)) : 50;

  const completedMissionsCount = state.dailyMissions.filter((m) => m.isCompleted).length;
  const totalMissionsCount = state.dailyMissions.length;

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* 1. HERO GOAL & LEVEL CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#0b101c] to-[#070a12] border border-slate-800/90 p-4 sm:p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                🎯 {profile.goal.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {profile.daysPerWeek}x por semana • {profile.location}
              </span>
            </div>

            <button
              onClick={() => onNavigateTab('journey')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
            >
              Ver Jornada ➔
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-7 space-y-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Olá, {profile.name}! 🔥
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isLoss
                  ? `Você já transformou ${weightDiff.toFixed(1)}kg desde o início. Mantenha a disciplina hoje!`
                  : `Construindo massa e força com consistência inabalável. Foco na meta!`}
              </p>

              {/* Progress to Target */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1 font-bold">
                  <span>Progresso para a Meta ({targetW}kg)</span>
                  <span className="text-emerald-400 font-black">{goalProgressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${goalProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Metrics Bento */}
            <div className="sm:col-span-5 grid grid-cols-2 gap-2.5">
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Peso Atual</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">
                  {currentW} <span className="text-xs font-normal text-slate-400">kg</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center justify-center gap-0.5">
                  {currentW < startW ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                  {Math.abs(currentW - startW).toFixed(1)}kg do início
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Treinos Feitos</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">
                  {state.workoutHistory.length}
                </div>
                <div className="text-[10px] text-amber-400 font-bold mt-0.5">
                  +{state.xp} XP total
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEXT WORKOUT CARD */}
      {nextRoutine && (
        <div className="bg-[#0e1422] border border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Próximo Treino
                </span>
                <span className="text-xs text-slate-400 font-medium">{nextRoutine.dayLabel}</span>
              </div>
              <h3 className="text-lg font-black text-white">{nextRoutine.name}</h3>
              <p className="text-xs text-slate-300">
                {nextRoutine.subtitle} • {nextRoutine.exercises.length} exercícios (~{nextRoutine.estimatedMinutes} min)
              </p>
            </div>

            <button
              id="fitness-start-workout-dash-btn"
              onClick={() => onStartWorkout(nextRoutine)}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all transform hover:scale-[1.02] shrink-0"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Iniciar Treino Agora</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. MISSÕES DE HOJE (GAMIFICAÇÃO DIÁRIA) */}
      <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Missões de Hoje</h3>
              <p className="text-[11px] text-slate-400">
                {completedMissionsCount}/{totalMissionsCount} missões concluídas
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
            Ganhe até +280 XP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {state.dailyMissions.map((mission) => {
            const isDone = mission.isCompleted;
            return (
              <div
                key={mission.id}
                onClick={() => onToggleMission(mission.id)}
                className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 opacity-90'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold truncate ${
                          isDone ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {mission.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                      {mission.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md ml-2 shrink-0 ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  +{mission.xpReward} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. QUICK LOG ACTION BAR */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenQuickLog}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs transition-colors shadow-sm"
        >
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>Registrar Peso / Medidas</span>
        </button>

        <button
          onClick={() => onNavigateTab('evolution')}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs transition-colors shadow-sm"
        >
          <TrendingUp className="w-4 h-4 text-teal-400" />
          <span>Ver Gráficos & Fotos</span>
        </button>
      </div>
    </div>
  );
};
