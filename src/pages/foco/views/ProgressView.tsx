import { useMemo } from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Award, 
  Flame, 
  Sparkles, 
  Calendar, 
  BookOpen,
  PieChart,
  BarChart3,
  Target
} from 'lucide-react';
import { FocoSession, FocoTask, FocoCategory, FocoSettings } from '../../../services/focoStorage';

interface ProgressViewProps {
  settings: FocoSettings;
  sessions: FocoSession[];
  tasks: FocoTask[];
  categories: FocoCategory[];
}

export function ProgressView({
  settings,
  sessions,
  tasks,
  categories,
}: ProgressViewProps) {
  // Calculations
  const totalSessionsCount = sessions.filter((s) => s.completed).length;
  const totalStudyMinutes = sessions
    .filter((s) => s.completed)
    .reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  const completedTasksCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'pending').length;
  const totalTasksCount = tasks.length;
  const taskCompletionRate =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Last 7 days breakdown
  const last7Days = useMemo(() => {
    const days: { dateStr: string; dayLabel: string; minutes: number }[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3);

      const daySessions = sessions.filter((s) => s.date === dateStr && s.completed);
      const mins = daySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

      days.push({ dateStr, dayLabel, minutes: mins });
    }
    return days;
  }, [sessions]);

  const maxDailyMinutes = Math.max(60, ...last7Days.map((d) => d.minutes));

  // Study time by Category
  const categoryBreakdown = useMemo(() => {
    const map: { [cat: string]: number } = {};
    sessions
      .filter((s) => s.completed)
      .forEach((s) => {
        map[s.category] = (map[s.category] || 0) + (s.durationMinutes || 0);
      });

    return Object.entries(map)
      .map(([name, mins]) => {
        const cat = categories.find((c) => c.name === name);
        const percent = totalStudyMinutes > 0 ? Math.round((mins / totalStudyMinutes) * 100) : 0;
        return {
          name,
          mins,
          percent,
          color: cat?.color || '#6366f1',
        };
      })
      .sort((a, b) => b.mins - a.mins);
  }, [sessions, categories, totalStudyMinutes]);

  // Achievements Gamification System
  const achievements = [
    {
      id: 'first_session',
      title: 'Primeiro Foco',
      desc: 'Completou sua 1ª sessão de foco',
      icon: '🎯',
      unlocked: totalSessionsCount >= 1,
      progress: `${Math.min(1, totalSessionsCount)}/1`,
    },
    {
      id: 'streak_3',
      title: 'Sequência de Fogo',
      desc: 'Estudou por 3 dias consecutivos',
      icon: '🔥',
      unlocked: settings.streakDays >= 3,
      progress: `${settings.streakDays}/3 dias`,
    },
    {
      id: 'focus_5',
      title: 'Foco de Ferro',
      desc: 'Realizou 5 sessões de foco completas',
      icon: '⚡',
      unlocked: totalSessionsCount >= 5,
      progress: `${totalSessionsCount}/5`,
    },
    {
      id: 'tasks_10',
      title: 'Mestre da Organização',
      desc: 'Concluiu 10 tarefas de estudos',
      icon: '🏆',
      unlocked: completedTasksCount >= 10,
      progress: `${completedTasksCount}/10`,
    },
    {
      id: 'hours_5',
      title: 'Maratona Acadêmica',
      desc: 'Acumulou mais de 5 horas de estudo',
      icon: '🧠',
      unlocked: totalStudyMinutes >= 300,
      progress: `${totalStudyHours}/5h`,
    },
    {
      id: 'weekly_goal',
      title: 'Meta Batida',
      desc: 'Alcançou a meta semanal de estudos',
      icon: '💎',
      unlocked: totalStudyMinutes >= (settings.weeklyGoalHours || 7) * 60,
      progress: `${totalStudyHours}/${settings.weeklyGoalHours}h`,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div id="foco-progress-view" className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Meu Progresso 📊
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Acompanhe seu tempo de estudo, consistência e conquistas desbloqueadas.
        </p>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Estudado</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalStudyHours}h
          </div>
          <div className="text-[11px] text-slate-500">{totalStudyMinutes} min acumulados</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sessões Foco</span>
            <Sparkles className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400">
            {totalSessionsCount}
          </div>
          <div className="text-[11px] text-slate-500">blocos finalizados</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tarefas Feitas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {completedTasksCount}
          </div>
          <div className="text-[11px] text-slate-500">{taskCompletionRate}% de conclusão</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conquistas</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
            {unlockedCount} / {achievements.length}
          </div>
          <div className="text-[11px] text-slate-500">medalhas ganhas</div>
        </div>
      </div>

      {/* 3. Weekly Activity Bar Chart */}
      <div className="rounded-3xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Histórico dos Últimos 7 Dias
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Tempo diário de estudo</span>
        </div>

        {/* Custom Bar Visualization */}
        <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
          {last7Days.map((day) => {
            const barHeightPercent = maxDailyMinutes > 0 ? (day.minutes / maxDailyMinutes) * 100 : 0;
            const isToday = day.dateStr === new Date().toISOString().split('T')[0];

            return (
              <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-extrabold text-slate-400 group-hover:text-indigo-500 transition-colors">
                  {day.minutes > 0 ? `${day.minutes}m` : '0'}
                </span>
                <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden flex flex-col justify-end h-28 p-0.5">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-indigo-600 to-sky-400'
                        : 'bg-indigo-500/70 hover:bg-indigo-500'
                    }`}
                    style={{ height: `${Math.max(6, barHeightPercent)}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] font-bold capitalize ${
                    isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
                  }`}
                >
                  {day.dayLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Subject Distribution & Time Breakdown */}
      <div className="rounded-3xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Distribuição por Matéria
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Total por matéria</span>
        </div>

        {categoryBreakdown.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            Nenhum tempo de estudo registrado ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </span>
                  <span className="text-slate-500">
                    {cat.mins} min <span className="text-slate-400">({cat.percent}%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Gamification / Badges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Medalhas & Conquistas
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-500">
            {unlockedCount} de {achievements.length} liberadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                ach.unlocked
                  ? 'bg-amber-500/10 border-amber-500/30 text-slate-900 dark:text-white shadow-xs'
                  : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 opacity-50 grayscale'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                {ach.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-black truncate">{ach.title}</h4>
                  <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                    {ach.progress}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {ach.desc}
                </p>
                <div className="pt-1">
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                      ach.unlocked
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {ach.unlocked ? 'Conquistado!' : 'Bloqueado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
