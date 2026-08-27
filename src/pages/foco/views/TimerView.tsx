import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Flame, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { FocoSession, FocoCategory, FocoSettings, focoService } from '../../../services/focoStorage';
import { playTimerCompletionSound, playTickSound } from '../../../utils/audio';

interface TimerViewProps {
  settings: FocoSettings;
  categories: FocoCategory[];
  sessions: FocoSession[];
  onSessionFinished: () => void;
}

const PRESET_MINUTES = [15, 25, 30, 45, 60];

export function TimerView({
  settings,
  categories,
  sessions,
  onSessionFinished,
}: TimerViewProps) {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(25);
  const [isCustom, setIsCustom] = useState(false);
  const [customInput, setCustomInput] = useState('20');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.name || 'Matemática');
  
  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [totalSeconds, setTotalSeconds] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<string>('');
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set initial or change preset
  const handleSelectPreset = (minutes: number) => {
    if (isActive) return;
    setIsCustom(false);
    setSelectedMinutes(minutes);
    setTotalSeconds(minutes * 60);
    setSecondsRemaining(minutes * 60);
  };

  const handleApplyCustom = () => {
    if (isActive) return;
    const mins = parseInt(customInput) || 25;
    const clamped = Math.max(1, Math.min(180, mins));
    setIsCustom(true);
    setSelectedMinutes(clamped);
    setTotalSeconds(clamped * 60);
    setSecondsRemaining(clamped * 60);
  };

  // Timer Tick effect
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleCompleteSession(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  // Start
  const handleStartTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    const now = new Date();
    setSessionStartTime(now.toTimeString().substring(0, 5));
  };

  // Pause / Resume
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Complete / Finish Session
  const handleCompleteSession = async (naturalFinish = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const now = new Date();
    const endTimeStr = now.toTimeString().substring(0, 5);
    const dateStr = now.toISOString().split('T')[0];

    const elapsedSeconds = totalSeconds - secondsRemaining;
    const durationMins = naturalFinish
      ? selectedMinutes
      : Math.max(1, Math.round(elapsedSeconds / 60));

    if (durationMins >= 1) {
      const newSession: FocoSession = {
        id: `sess-${Date.now()}`,
        date: dateStr,
        durationMinutes: durationMins,
        startTime: sessionStartTime || endTimeStr,
        endTime: endTimeStr,
        category: selectedCategory,
        completed: true,
      };

      await focoService.saveSession(newSession);
      onSessionFinished();

      if (settings.soundEnabled) {
        playTimerCompletionSound();
      }

      setSessionCompletedNotice(true);
      setTimeout(() => setSessionCompletedNotice(false), 5000);
    }

    setIsActive(false);
    setIsPaused(false);
    setSecondsRemaining(selectedMinutes * 60);
  };

  // Cancel Session
  const handleCancelTimer = () => {
    if (window.confirm('Tem certeza de que deseja cancelar a sessão de foco atual?')) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsActive(false);
      setIsPaused(false);
      setSecondsRemaining(selectedMinutes * 60);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (window.confirm('Excluir este registro de foco?')) {
      await focoService.deleteSession(sessionId);
      onSessionFinished();
    }
  };

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressFraction = totalSeconds > 0 ? (totalSeconds - secondsRemaining) / totalSeconds : 0;
  const strokeDashoffset = 596 * (1 - progressFraction);

  // Recent 5 sessions
  const recentSessions = [...sessions]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  return (
    <div id="foco-timer-view" className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Modo Foco ⏱️
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Elimine distrações, estude em blocos e registre seu tempo automaticamente.
          </p>
        </div>

        {/* Selected subject pill */}
        {!isActive && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Matéria:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Completion Toast Notification */}
      {sessionCompletedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          <div className="text-xs sm:text-sm font-bold">
            🎉 Parabéns! Sessão de foco concluída e registrada no seu histórico!
          </div>
        </div>
      )}

      {/* 2. Main Timer Display Card */}
      <div className="rounded-3xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl flex flex-col items-center justify-center relative overflow-hidden text-center space-y-6">
        {/* Glow ambient */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isActive && !isPaused
              ? 'bg-indigo-500/20 scale-110'
              : isActive && isPaused
              ? 'bg-amber-500/15'
              : 'bg-slate-500/10'
          }`}
        />

        {/* Subject tag during active session */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
            📚 {selectedCategory}
          </span>
          {isActive && (
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                isPaused
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse'
              }`}
            >
              {isPaused ? 'Pausado' : 'Foco Ativo'}
            </span>
          )}
        </div>

        {/* Big Circular Clock */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
            {/* Background track */}
            <circle
              cx="110"
              cy="110"
              r="95"
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Progress circle */}
            <circle
              cx="110"
              cy="110"
              r="95"
              strokeWidth="12"
              strokeDasharray="596"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="url(#timerGradient)"
              fill="transparent"
              className="transition-all duration-500 ease-linear"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time digits centered */}
          <div className="absolute flex flex-col items-center justify-center space-y-1">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
              {formatTime(secondsRemaining)}
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              {isActive ? (isPaused ? 'Em Pausa' : 'Restante') : `${selectedMinutes} minutos`}
            </span>
          </div>
        </div>

        {/* 3. Preset Duration Selector (Only shown when not active) */}
        {!isActive && (
          <div className="space-y-3 w-full max-w-md pt-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              Escolha a Duração
            </div>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_MINUTES.map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() => handleSelectPreset(min)}
                  className={`py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all ${
                    !isCustom && selectedMinutes === min
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {min}m
                </button>
              ))}
            </div>

            {/* Custom Minutes Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="number"
                min="1"
                max="180"
                placeholder="Personalizado (min)"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleApplyCustom}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isCustom
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Definir
              </button>
            </div>
          </div>
        )}

        {/* 4. Action Control Buttons */}
        <div className="w-full max-w-sm pt-2">
          {!isActive ? (
            <button
              type="button"
              onClick={handleStartTimer}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Iniciar Sessão</span>
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={handleTogglePause}
                className="py-3.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                <span>{isPaused ? 'Continuar' : 'Pausar'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCompleteSession(false)}
                className="py-3.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Finalizar</span>
              </button>

              <button
                type="button"
                onClick={handleCancelTimer}
                className="py-3.5 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5. Recent Sessions History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
              Sessões Recentes
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            {sessions.length} registradas
          </span>
        </div>

        {recentSessions.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-400">
            Nenhuma sessão de foco realizada ainda. Comece a primeira agora!
          </div>
        ) : (
          <div className="space-y-2">
            {recentSessions.map((sess) => (
              <div
                key={sess.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold">
                    ⏱️
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {sess.category}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>
                        {sess.date.split('-').reverse().slice(0, 2).join('/')}
                      </span>
                      <span>•</span>
                      <span>
                        {sess.startTime} - {sess.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-black">
                    +{sess.durationMinutes} min
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSession(sess.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
