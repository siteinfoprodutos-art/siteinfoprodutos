import { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  CheckSquare, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Moon, 
  Sun, 
  ArrowLeft, 
  Sparkles,
  Award,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { 
  focoService, 
  FocoTask, 
  FocoCategory, 
  FocoSession, 
  FocoEvent, 
  FocoSettings, 
  DEFAULT_SETTINGS 
} from '../../services/focoStorage';
import { DashboardView } from './views/DashboardView';
import { TasksView } from './views/TasksView';
import { TimerView } from './views/TimerView';
import { PlanningView } from './views/PlanningView';
import { ProgressView } from './views/ProgressView';
import { SettingsModal } from './components/SettingsModal';

type FocoTab = 'dashboard' | 'tasks' | 'timer' | 'planning' | 'progress';

interface FocoAppProps {
  onBackToStore: () => void;
}

export function FocoApp({ onBackToStore }: FocoAppProps) {
  const [activeTab, setActiveTab] = useState<FocoTab>('dashboard');
  const [loading, setLoading] = useState(true);

  // State
  const [tasks, setTasks] = useState<FocoTask[]>([]);
  const [categories, setCategories] = useState<FocoCategory[]>([]);
  const [sessions, setSessions] = useState<FocoSession[]>([]);
  const [events, setEvents] = useState<FocoEvent[]>([]);
  const [settings, setSettings] = useState<FocoSettings>(DEFAULT_SETTINGS);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Load data from IndexedDB
  const refreshAllData = useCallback(async () => {
    try {
      await focoService.initData();
      const [allTasks, allCats, allSessions, allEvents, currSettings] = await Promise.all([
        focoService.getTasks(),
        focoService.getCategories(),
        focoService.getSessions(),
        focoService.getEvents(),
        focoService.getSettings(),
      ]);

      setTasks(allTasks);
      setCategories(allCats);
      setSessions(allSessions);
      setEvents(allEvents);
      setSettings(currSettings);
    } catch (err) {
      console.error('Failed to load AL Studio Foco data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Handle task quick toggle
  const handleToggleTask = async (taskId: string) => {
    await focoService.toggleTask(taskId);
    refreshAllData();
  };

  // Nav tabs config
  const navTabs = [
    { id: 'dashboard' as const, label: 'Meu Dia', icon: Home, emoji: '☀️' },
    { id: 'tasks' as const, label: 'Tarefas', icon: CheckSquare, emoji: '✅' },
    { id: 'timer' as const, label: 'Foco', icon: Clock, emoji: '⏱️' },
    { id: 'planning' as const, label: 'Agenda', icon: Calendar, emoji: '📅' },
    { id: 'progress' as const, label: 'Progresso', icon: TrendingUp, emoji: '📊' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl animate-bounce shadow-lg shadow-indigo-500/30">
          🎯
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black tracking-tight">AL Studio Foco</h2>
          <p className="text-xs text-slate-400">Carregando seus estudos locais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#0b0f17] text-white' : 'bg-slate-50 text-slate-900'} flex flex-col font-sans transition-colors duration-200`}>
      {/* 1. App Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0e1420]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: Back to store & App Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStore}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Voltar para a plataforma AL Studio Tech"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">AL Studio Tech</span>
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white text-base shadow-sm">
                🎯
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                    AL Studio Foco
                  </span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                    Jovem
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold hidden sm:block">
                  Organização & Foco para Estudantes
                </div>
              </div>
            </div>
          </div>

          {/* Right: Desktop Navigation & Controls */}
          <div className="flex items-center gap-1.5">
            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-white dark:bg-[#121824] text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings Trigger */}
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Configurações e Backup"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content View Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 pb-24 md:pb-12">
        {activeTab === 'dashboard' && (
          <DashboardView
            settings={settings}
            tasks={tasks}
            sessions={sessions}
            events={events}
            onStartFocus={() => setActiveTab('timer')}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onToggleTask={handleToggleTask}
            onOpenNewTaskModal={() => setActiveTab('tasks')}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksView
            tasks={tasks}
            categories={categories}
            onRefresh={refreshAllData}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'timer' && (
          <TimerView
            settings={settings}
            categories={categories}
            sessions={sessions}
            onSessionFinished={refreshAllData}
          />
        )}

        {activeTab === 'planning' && (
          <PlanningView
            events={events}
            tasks={tasks}
            categories={categories}
            onRefresh={refreshAllData}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            settings={settings}
            sessions={sessions}
            tasks={tasks}
            categories={categories}
          />
        )}
      </main>

      {/* 3. Mobile Bottom Sticky Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0e1420]/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 rounded-2xl transition-all ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-black tracking-tight mt-1">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Settings & Backup Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(newSettings) => setSettings(newSettings)}
        onRefreshData={refreshAllData}
      />
    </div>
  );
}
