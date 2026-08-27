import React, { useState } from 'react';
import { 
  Dumbbell, 
  Play, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  History, 
  Sparkles, 
  Plus, 
  Calendar, 
  Flame, 
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { FitnessState, WorkoutRoutine, CompletedWorkoutRecord } from '../types';

interface WorkoutsViewProps {
  state: FitnessState;
  onStartWorkout: (routine: WorkoutRoutine) => void;
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({ state, onStartWorkout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'rotinas' | 'historico'>('rotinas');
  const [expandedRoutineId, setExpandedRoutineId] = useState<string | null>(state.routines[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedRoutineId(expandedRoutineId === id ? null : id);
  };

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Top bar & Sub-tab switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Treinos & Rotinas</h2>
              <p className="text-xs text-slate-400">
                Personalizado para {state.profile.location} • {state.profile.daysPerWeek} dias por semana
              </p>
            </div>
          </div>
        </div>

        {/* Pill selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('rotinas')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeSubTab === 'rotinas'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Minhas Rotinas ({state.routines.length})
          </button>
          <button
            onClick={() => setActiveSubTab('historico')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeSubTab === 'historico'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Histórico ({state.workoutHistory.length})
          </button>
        </div>
      </div>

      {/* 1. ROTINAS VIEW */}
      {activeSubTab === 'rotinas' && (
        <div className="space-y-4">
          {state.routines.map((routine, index) => {
            const isExpanded = expandedRoutineId === routine.id;

            return (
              <div
                key={routine.id}
                className={`bg-[#0c111e] border rounded-3xl overflow-hidden transition-all ${
                  isExpanded ? 'border-emerald-500/40 shadow-xl' : 'border-slate-800'
                }`}
              >
                {/* Routine Card Header */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div
                    className="flex-1 cursor-pointer flex items-start gap-3.5"
                    onClick={() => toggleExpand(routine.id)}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center font-black text-sm shrink-0 border border-slate-700">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          {routine.dayLabel}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" /> ~{routine.estimatedMinutes} min
                        </span>
                      </div>
                      <h3 className="text-base font-black text-white">{routine.name}</h3>
                      <p className="text-xs text-slate-300">{routine.subtitle}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => toggleExpand(routine.id)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? 'Ocultar' : 'Ver Exercícios'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onStartWorkout(routine)}
                      className="flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:opacity-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Iniciar</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Exercises List */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/60 p-4 sm:p-5 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Exercícios Programados ({routine.exercises.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {routine.exercises.map((ex, exIdx) => {
                        const totalSetsCount = ex.sets.length;
                        const repsSummary = ex.sets[0]?.targetReps || '10-12';
                        const firstWeight = ex.sets[0]?.weightKg || 0;

                        return (
                          <div
                            key={ex.id || exIdx}
                            className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-black text-white">
                                {exIdx + 1}. {ex.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <span className="text-emerald-400 font-bold">{ex.muscleGroup}</span>
                              <span>•</span>
                              <span>{ex.equipment}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800/60">
                              <span>
                                <strong className="text-white">{totalSetsCount} séries</strong> de {repsSummary} reps
                              </span>
                              {firstWeight > 0 && (
                                <span className="text-slate-400">~{firstWeight} kg</span>
                              )}
                              <span className="text-[10px] text-slate-500">
                                {ex.restSeconds}s descanso
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. HISTÓRICO DE TREINOS */}
      {activeSubTab === 'historico' && (
        <div className="space-y-3">
          {state.workoutHistory.length === 0 ? (
            <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-white">Nenhum treino registrado ainda</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Inicie seu primeiro treino na aba "Minhas Rotinas" e registre sua execução para começar seu histórico de evolução.
              </p>
            </div>
          ) : (
            state.workoutHistory.map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString('pt-BR', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="p-4 bg-[#0c111e] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 font-black">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">{item.routineName}</h4>
                      <p className="text-xs text-slate-400">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-sans">DURAÇÃO</span>
                      <strong>{item.durationMinutes} min</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-sans">VOLUME</span>
                      <strong className="text-emerald-400">{item.totalVolumeKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-sans">XP</span>
                      <strong className="text-amber-400">+{item.xpEarned}</strong>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
