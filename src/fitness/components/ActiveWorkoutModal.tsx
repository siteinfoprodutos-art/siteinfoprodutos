import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Check, RotateCcw, Clock, Trophy, Dumbbell, Sparkles, CheckCircle2, ChevronRight, Plus } from 'lucide-react';
import { WorkoutRoutine, Exercise, ExerciseSet, CompletedWorkoutRecord } from '../types';
import { playWorkoutSound } from '../utils/fitnessAudio';

interface ActiveWorkoutModalProps {
  routine: WorkoutRoutine;
  soundEnabled: boolean;
  onFinishWorkout: (record: CompletedWorkoutRecord) => void;
  onClose: () => void;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  routine,
  soundEnabled,
  onFinishWorkout,
  onClose,
}) => {
  // Deep copy of routine exercises to track in-session state
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    return JSON.parse(JSON.stringify(routine.exercises));
  });

  // Workout duration stopwatch (in seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState<boolean>(false);

  // Rest timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);
  const [selectedRestPreset, setSelectedRestPreset] = useState<number>(60);

  // Completed celebration modal
  const [isFinishedCelebration, setIsFinishedCelebration] = useState<boolean>(false);
  const [completionSummary, setCompletionSummary] = useState<{
    durationMinutes: number;
    totalVolumeKg: number;
    exercisesDone: number;
    xpEarned: number;
  } | null>(null);

  // Workout stopwatch effect
  useEffect(() => {
    if (isWorkoutPaused || isFinishedCelebration) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWorkoutPaused, isFinishedCelebration]);

  // Rest countdown effect
  useEffect(() => {
    if (!isRestActive || restSecondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setRestSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRestActive(false);
          if (soundEnabled) playWorkoutSound('beep');
          return 0;
        }
        if (prev === 4 && soundEnabled) {
          playWorkoutSound('beep');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRestActive, restSecondsRemaining, soundEnabled]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  const handleToggleSet = (exerciseIndex: number, setIndex: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      const targetEx = { ...copy[exerciseIndex] };
      const targetSets = [...targetEx.sets];
      const targetSet = { ...targetSets[setIndex] };

      const wasCompleted = targetSet.isCompleted;
      targetSet.isCompleted = !wasCompleted;

      // If marking as completed, trigger rest countdown
      if (!wasCompleted) {
        const restDuration = targetEx.restSeconds || 60;
        setRestSecondsRemaining(restDuration);
        setIsRestActive(true);
        setSelectedRestPreset(restDuration);
      }

      targetSets[setIndex] = targetSet;
      targetEx.sets = targetSets;
      copy[exerciseIndex] = targetEx;
      return copy;
    });
  };

  const handleUpdateSetWeight = (exerciseIndex: number, setIndex: number, weight: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[exerciseIndex].sets[setIndex].weightKg = weight;
      return copy;
    });
  };

  const handleUpdateSetReps = (exerciseIndex: number, setIndex: number, reps: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[exerciseIndex].sets[setIndex].completedReps = reps;
      return copy;
    });
  };

  const handleAddSet = (exerciseIndex: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      const ex = copy[exerciseIndex];
      const lastSet = ex.sets[ex.sets.length - 1];
      const newSetNumber = ex.sets.length + 1;
      ex.sets.push({
        setNumber: newSetNumber,
        targetReps: lastSet?.targetReps || '10-12',
        weightKg: lastSet?.weightKg || 0,
        isCompleted: false,
      });
      return copy;
    });
  };

  const handleCompleteWorkout = () => {
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    let totalVolumeKg = 0;
    let completedSetsCount = 0;

    exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.isCompleted) {
          completedSetsCount++;
          const repsNum = s.completedReps || parseInt(s.targetReps, 10) || 10;
          const weightNum = s.weightKg || 0;
          totalVolumeKg += repsNum * weightNum;
        }
      });
    });

    const xpEarned = 150 + Math.min(100, completedSetsCount * 10);

    const record: CompletedWorkoutRecord = {
      id: `wrk-${Date.now()}`,
      routineId: routine.id,
      routineName: routine.name,
      date: new Date().toISOString(),
      durationMinutes,
      totalVolumeKg,
      exercisesCompleted: exercises.length,
      xpEarned,
      notes: `Treino finalizado com ${completedSetsCount} séries concluídas.`,
    };

    if (soundEnabled) {
      playWorkoutSound('finish');
    }

    setCompletionSummary({
      durationMinutes,
      totalVolumeKg,
      exercisesDone: exercises.length,
      xpEarned,
    });
    setIsFinishedCelebration(true);

    onFinishWorkout(record);
  };

  // Completed sets count
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.isCompleted).length,
    0
  );
  const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between overflow-hidden">
      {/* Header bar */}
      <div className="bg-[#0b0f19] border-b border-slate-800 px-4 py-3 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">{routine.name}</h2>
              <p className="text-[11px] text-slate-400">{routine.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stopwatch */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-2.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-bold shrink-0">
            {completedSets}/{totalSets} séries ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Floating Rest Timer Pill */}
      {isRestActive && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3 animate-bounce">
          <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
          <span className="text-xs font-bold">Descanso: {formatTime(restSecondsRemaining)}</span>
          <button
            onClick={() => setIsRestActive(false)}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
          >
            Pular
          </button>
        </div>
      )}

      {/* Main Exercise List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full space-y-4">
        {exercises.map((exercise, exIdx) => {
          return (
            <div
              key={exercise.id || exIdx}
              className="bg-[#0e1422] border border-slate-800/90 rounded-2xl p-4 shadow-sm"
            >
              {/* Exercise Title & Info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 text-xs flex items-center justify-center font-bold">
                      {exIdx + 1}
                    </span>
                    {exercise.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 ml-7">
                    <span>{exercise.muscleGroup}</span>
                    <span>•</span>
                    <span>{exercise.equipment}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{exercise.restSeconds}s descanso</span>
                  </div>
                </div>
              </div>

              {/* Sets Table */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-500 px-2">
                  <div className="col-span-2">SÉRIE</div>
                  <div className="col-span-4 text-center">CARGA (KG)</div>
                  <div className="col-span-4 text-center">REPS</div>
                  <div className="col-span-2 text-right">FEITO</div>
                </div>

                {exercise.sets.map((set, setIdx) => {
                  const isDone = !!set.isCompleted;
                  return (
                    <div
                      key={set.setNumber || setIdx}
                      className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="col-span-2 text-xs font-bold text-slate-400 pl-1">
                        #{set.setNumber}
                      </div>

                      {/* Weight Input */}
                      <div className="col-span-4">
                        <div className="flex items-center justify-center">
                          <input
                            type="number"
                            step="0.5"
                            value={set.weightKg ?? 0}
                            onChange={(e) =>
                              handleUpdateSetWeight(exIdx, setIdx, Number(e.target.value))
                            }
                            className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-center font-bold text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Reps Target / Input */}
                      <div className="col-span-4">
                        <div className="flex items-center justify-center">
                          <input
                            type="number"
                            value={set.completedReps ?? (parseInt(set.targetReps, 10) || 10)}
                            onChange={(e) =>
                              handleUpdateSetReps(exIdx, setIdx, Number(e.target.value))
                            }
                            className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-center font-bold text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Done Toggle */}
                      <div className="col-span-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleToggleSet(exIdx, setIdx)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-500'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Set Button */}
              <button
                type="button"
                onClick={() => handleAddSet(exIdx)}
                className="mt-2 text-[11px] font-bold text-slate-400 hover:text-emerald-400 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar Série
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="bg-[#0b0f19] border-t border-slate-800 p-4 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsWorkoutPaused(!isWorkoutPaused)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors"
          >
            {isWorkoutPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
            <span>{isWorkoutPaused ? 'Retomar' : 'Pausar'}</span>
          </button>

          <button
            type="button"
            id="fitness-finish-workout-btn"
            onClick={handleCompleteWorkout}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Concluir Treino</span>
          </button>
        </div>
      </div>

      {/* CELEBRATION MODAL */}
      {isFinishedCelebration && completionSummary && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0e1424] border border-emerald-500/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto text-slate-950 shadow-lg shadow-emerald-500/30">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                TREINO CONCLUÍDO! 🔥
              </span>
              <h2 className="text-2xl font-black text-white mt-2">Excelente Trabalho!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Sua consistência é o motor da sua transformação física.
              </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
              <div>
                <div className="text-[10px] font-bold text-slate-400">DURAÇÃO</div>
                <div className="text-sm font-black text-white mt-0.5">
                  {completionSummary.durationMinutes} min
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400">VOLUME</div>
                <div className="text-sm font-black text-emerald-400 mt-0.5">
                  {completionSummary.totalVolumeKg} kg
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400">XP GANHO</div>
                <div className="text-sm font-black text-amber-400 mt-0.5">
                  +{completionSummary.xpEarned} XP
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
