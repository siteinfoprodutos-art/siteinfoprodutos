import React from 'react';
import { 
  Compass, 
  Flag, 
  MapPin, 
  Target, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Dumbbell, 
  Calendar, 
  Flame,
  Award
} from 'lucide-react';
import { FitnessState } from '../types';
import { generateJourneyMilestones } from '../services/gamificationEngine';

interface JourneyViewProps {
  state: FitnessState;
  onStartNextWorkout: () => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({ state, onStartNextWorkout }) => {
  const profile = state.profile;
  const currentWeight = state.weightHistory[state.weightHistory.length - 1]?.weightKg || profile.currentWeightKg;
  const startWeight = profile.startWeightKg;
  const targetWeight = profile.targetWeightKg;
  const totalWorkouts = state.workoutHistory.length;

  const milestones = generateJourneyMilestones(
    profile,
    totalWorkouts,
    currentWeight,
    state.streakDays
  );

  const isLoss = profile.goal === 'emagrecer';
  const weightChange = Math.abs(currentWeight - startWeight);
  const totalGoalDelta = Math.abs(targetWeight - startWeight);
  const percentCompleted = totalGoalDelta > 0
    ? Math.min(100, Math.max(5, Math.round((weightChange / totalGoalDelta) * 100)))
    : 50;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Sua Jornada de Evolução</h2>
              <p className="text-xs text-slate-400">Do ponto de partida até o físico que você busca</p>
            </div>
          </div>
        </div>
      </div>

      {/* THREE PILLARS: ONDE COMEÇOU -> ONDE ESTÁ -> ONDE QUER CHEGAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. ONDE COMEÇOU */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-4 sm:p-5 relative space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
              1
            </span>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Ponto de Partida
              </span>
              <h3 className="text-sm font-black text-white">ONDE COMEÇOU</h3>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Peso Inicial:</span>
              <strong className="text-white font-bold">{startWeight} kg</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Início da Jornada:</span>
              <strong className="text-slate-300">
                {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
              </strong>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Nível Inicial:</span>
              <strong className="text-slate-300 capitalize">{profile.experience}</strong>
            </div>
          </div>
        </div>

        {/* 2. ONDE ESTÁ (ACTIVE HIGHLIGHT) */}
        <div className="bg-gradient-to-b from-[#0f1d2e] to-[#0a121f] border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-5 relative space-y-3 shadow-lg shadow-emerald-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
                2
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  Momento Presente
                </span>
                <h3 className="text-sm font-black text-white">ONDE ESTÁ HOJE</h3>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              {percentCompleted}% da meta
            </span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-300">Peso Atual:</span>
              <strong className="text-emerald-400 font-black text-sm">{currentWeight} kg</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-300">Treinos Concluídos:</span>
              <strong className="text-white font-bold">{totalWorkouts} treinos</strong>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-300">Sequência Ativa:</span>
              <strong className="text-orange-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-400" />
                {state.streakDays} dias
              </strong>
            </div>
          </div>
        </div>

        {/* 3. ONDE QUER CHEGAR */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-4 sm:p-5 relative space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                Transformação
              </span>
              <h3 className="text-sm font-black text-white">ONDE QUER CHEGAR</h3>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Peso Meta:</span>
              <strong className="text-white font-bold">{targetWeight} kg</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Objetivo:</span>
              <strong className="text-slate-300 capitalize">{profile.goal}</strong>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Frequência Semanal:</span>
              <strong className="text-slate-300">{profile.daysPerWeek} dias/semana</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ROADMAP / MARCOS PERSONALIZADOS */}
      <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center font-bold">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Trilha de Marcos da Sua Meta</h3>
              <p className="text-[11px] text-slate-400">Fases de adaptação e transformação progressiva</p>
            </div>
          </div>
        </div>

        {/* Timeline items */}
        <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
          {milestones.map((ms) => {
            return (
              <div
                key={ms.id}
                className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  ms.isCurrent
                    ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/30'
                    : ms.isPassed
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                    : 'bg-slate-950/60 border-slate-900/80 opacity-70'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                    ms.isPassed
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : ms.isCurrent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500 animate-pulse'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {ms.isPassed ? (
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{ms.order}</span>
                  )}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4
                      className={`text-sm font-black ${
                        ms.isCurrent ? 'text-emerald-400' : 'text-white'
                      }`}
                    >
                      {ms.title}
                    </h4>
                    {ms.isCurrent && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        EM ANDAMENTO
                      </span>
                    )}
                    {ms.isPassed && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                        CONCLUÍDO ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{ms.description}</p>
                  <div className="text-[11px] text-slate-500 pt-1 font-mono">
                    Critério: <span className="text-slate-300">{ms.targetDescription}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
