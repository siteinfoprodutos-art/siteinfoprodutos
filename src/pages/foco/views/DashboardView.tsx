import { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  Target, 
  BookOpen, 
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { FocoTask, FocoSession, FocoEvent, FocoSettings, focoService } from '../../../services/focoStorage';

interface DashboardViewProps {
  settings: FocoSettings;
  tasks: FocoTask[];
  sessions: FocoSession[];
  events: FocoEvent[];
  onStartFocus: () => void;
  onNavigateTab: (tab: 'dashboard' | 'tasks' | 'timer' | 'planning' | 'progress') => void;
  onToggleTask: (taskId: string) => void;
  onOpenNewTaskModal: () => void;
}

export function DashboardView({
  settings,
  tasks,
  sessions,
  events,
  onStartFocus,
  onNavigateTab,
  onToggleTask,
  onOpenNewTaskModal,
}: DashboardViewProps) {
  const [greeting, setGreeting] = useState('');
  const [todayFormatted, setTodayFormatted] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    const formatted = new Date().toLocaleDateString('pt-BR', dateOptions);
    setTodayFormatted(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  // Today's stats calculation
  const todaySessions = sessions.filter((s) => s.date === todayStr && s.completed);
  const minutesStudiedToday = todaySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  const dailyGoal = settings.dailyGoalMinutes || 60;
  const progressPercent = Math.min(100, Math.round((minutesStudiedToday / dailyGoal) * 100));

  const todayTasks = tasks.filter((t) => t.date === todayStr);
  const pendingTasks = todayTasks.filter((t) => t.status === 'pending');
  const completedTasks = todayTasks.filter((t) => t.status === 'completed');

  // Next upcoming event (today or future)
  const upcomingEvents = events
    .filter((e) => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextEvent = upcomingEvents[0];

  const getProgressMessage = (percent: number) => {
    if (percent === 0) return 'Dê o primeiro passo hoje! Comece uma sessão de 25 min.';
    if (percent < 50) return 'Bom começo! Você está construindo seu ritmo de estudos.';
    if (percent < 100) return 'Você está indo muito bem! Continue assim para bater a meta.';
    return '🎉 Incrível! Você atingiu sua meta diária de estudos hoje!';
  };

  return (
    <div id="foco-dashboard-view" className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 1. Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
            {todayFormatted}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{greeting}, {settings.userName}!</span>
            <span className="text-2xl sm:text-3xl">{settings.avatar}</span>
          </h1>
        </div>

        {/* Streak Counter */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 self-start sm:self-auto shadow-xs">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
          <div className="text-xs font-black">
            {settings.streakDays} {settings.streakDays === 1 ? 'dia seguido' : 'dias seguidos'}
          </div>
        </div>
      </div>

      {/* 2. Main Daily Progress Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-7 text-white shadow-xl border border-indigo-500/30 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">
                Progresso de hoje
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-2">
                <span>{minutesStudiedToday}</span>
                <span className="text-base sm:text-lg font-bold text-indigo-300">/ {dailyGoal} min</span>
              </div>
            </div>

            {/* Percentage Badge */}
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-sky-400">
                {progressPercent}%
              </div>
              <span className="text-[11px] font-semibold text-slate-300">da meta diária</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-indigo-200 font-medium leading-relaxed">
              {getProgressMessage(progressPercent)}
            </p>
          </div>

          {/* Main Action CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartFocus}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-slate-950 font-black text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span className="text-xl">🎯</span>
              <span>Começar foco agora</span>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Estudo Hoje</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {minutesStudiedToday}m
          </div>
          <div className="text-[11px] text-slate-500">{todaySessions.length} sessões feitas</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pendentes</span>
            <Circle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            {pendingTasks.length}
          </div>
          <div className="text-[11px] text-slate-500">tarefas para fazer</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Concluídas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {completedTasks.length}
          </div>
          <div className="text-[11px] text-slate-500">finalizadas hoje</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sequência</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-400">
            {settings.streakDays}d
          </div>
          <div className="text-[11px] text-slate-500">dias consecutivos</div>
        </div>
      </div>

      {/* 4. Next Upcoming Activity Banner (If any) */}
      {nextEvent && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xl shrink-0">
              {nextEvent.type === 'prova' ? '📝' : nextEvent.type === 'trabalho' ? '📑' : '📌'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  {nextEvent.type.toUpperCase()}
                </span>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-bold">
                  {nextEvent.date === todayStr ? 'Hoje' : `Data: ${nextEvent.date.split('-').reverse().slice(0, 2).join('/')}`}
                  {nextEvent.time ? ` às ${nextEvent.time}` : ''}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white pt-0.5">
                {nextEvent.title}
              </h4>
              {nextEvent.note && (
                <p className="text-xs text-slate-500 line-clamp-1">{nextEvent.note}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('planning')}
            className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 5. Today's Tasks Quick Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
              Minhas Tarefas de Hoje
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {todayTasks.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenNewTaskModal}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('tasks')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 ml-2"
            >
              Ver todas
            </button>
          </div>
        </div>

        {todayTasks.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Nenhuma tarefa agendada para hoje
            </p>
            <p className="text-[11px] text-slate-500">
              Adicione suas tarefas do dia para manter tudo organizado e bater suas metas.
            </p>
            <button
              type="button"
              onClick={onOpenNewTaskModal}
              className="mt-2 py-2 px-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors"
            >
              + Criar tarefa de hoje
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  task.status === 'completed'
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                    : 'bg-white dark:bg-[#121824] border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    className="shrink-0 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <div
                      className={`text-xs sm:text-sm font-bold truncate ${
                        task.status === 'completed'
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[10px] font-extrabold text-indigo-500 dark:text-indigo-400">
                        {task.category}
                      </span>
                      {task.priority === 'urgente' && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-600">
                          Urgente
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-[11px] font-bold text-slate-400">
                  {task.status === 'completed' ? 'Feito' : 'Pendente'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
