import React, { useState } from 'react';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Trash2, 
  Tag, 
  X, 
  BookOpen, 
  AlertCircle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { FocoEvent, FocoCategory, FocoTask, focoService } from '../../../services/focoStorage';

interface PlanningViewProps {
  events: FocoEvent[];
  tasks: FocoTask[];
  categories: FocoCategory[];
  onRefresh: () => void;
}

export function PlanningView({
  events,
  tasks,
  categories,
  onRefresh,
}: PlanningViewProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'prova' | 'trabalho' | 'entrega' | 'evento'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Month navigation
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formTime, setFormTime] = useState('');
  const [formType, setFormType] = useState<'prova' | 'trabalho' | 'entrega' | 'evento'>('prova');
  const [formCategory, setFormCategory] = useState(categories[0]?.name || 'Matemática');
  const [formNote, setFormNote] = useState('');

  const typeMeta = {
    prova: { label: 'Prova', emoji: '📝', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
    trabalho: { label: 'Trabalho', emoji: '📑', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    entrega: { label: 'Entrega', emoji: '📦', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
    evento: { label: 'Evento', emoji: '🎉', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  };

  const openNewEventModal = (initialType?: 'prova' | 'trabalho' | 'entrega' | 'evento') => {
    setFormTitle('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormTime('08:00');
    setFormType(initialType || 'prova');
    setFormCategory(categories[0]?.name || 'Matemática');
    setFormNote('');
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newEvent: FocoEvent = {
      id: `event-${Date.now()}`,
      title: formTitle.trim(),
      date: formDate,
      time: formTime || undefined,
      type: formType,
      category: formCategory,
      note: formNote.trim() || undefined,
    };

    await focoService.saveEvent(newEvent);
    setIsModalOpen(false);
    onRefresh();
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Excluir este compromisso?')) {
      await focoService.deleteEvent(eventId);
      onRefresh();
    }
  };

  // Filter events
  const filteredEvents = events
    .filter((e) => selectedType === 'all' || e.type === selectedType)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Calendar calculations
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentMonthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div id="foco-planning-view" className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Planejamento & Provas 📅
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Acompanhe provas bimestrais, prazos de entrega e datas importantes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openNewEventModal('prova')}
            className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-extrabold text-xs flex items-center gap-1.5 transition-colors border border-rose-200 dark:border-rose-800/60"
          >
            <span>📝 + Prova</span>
          </button>
          <button
            type="button"
            onClick={() => openNewEventModal('trabalho')}
            className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 font-extrabold text-xs flex items-center gap-1.5 transition-colors border border-amber-200 dark:border-amber-800/60"
          >
            <span>📑 + Trabalho</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Calendar View Card */}
      <div className="rounded-3xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        {/* Month Selector Bar */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white capitalize flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-500" />
            <span>{monthName}</span>
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-black uppercase tracking-wider text-slate-400">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 sm:h-12 rounded-xl bg-transparent" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const currentDayStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
            const dayEvents = events.filter((e) => e.date === currentDayStr);
            const dayTasks = tasks.filter((t) => t.date === currentDayStr);
            const isToday = currentDayStr === todayStr;

            return (
              <div
                key={currentDayStr}
                className={`h-10 sm:h-12 rounded-xl p-1 flex flex-col items-center justify-between border transition-all text-xs font-bold ${
                  isToday
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50/60 dark:bg-[#0b0f17] border-slate-100 dark:border-slate-800/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{dayNum}</span>
                {/* Indicators */}
                <div className="flex items-center gap-1">
                  {dayEvents.map((ev) => (
                    <span
                      key={ev.id}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          ev.type === 'prova'
                            ? '#ef4444'
                            : ev.type === 'trabalho'
                            ? '#f59e0b'
                            : '#10b981',
                      }}
                    />
                  ))}
                  {dayTasks.length > 0 && dayEvents.length === 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Event Type Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        {(['all', 'prova', 'trabalho', 'entrega', 'evento'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedType === t
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {t === 'all'
              ? `Todos (${events.length})`
              : `${typeMeta[t].emoji} ${typeMeta[t].label}s (${events.filter((e) => e.type === t).length})`}
          </button>
        ))}
      </div>

      {/* 4. Events Timeline List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3 shadow-xs">
            <Sparkles className="w-10 h-10 text-indigo-400 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
              Nenhum evento cadastrado
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Adicione suas datas de provas, entregas de trabalhos ou eventos importantes.
            </p>
            <button
              type="button"
              onClick={() => openNewEventModal()}
              className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md"
            >
              + Adicionar primeiro compromisso
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredEvents.map((ev) => {
              const meta = typeMeta[ev.type];
              const isPast = ev.date < todayStr;
              const isToday = ev.date === todayStr;

              return (
                <div
                  key={ev.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isPast
                      ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                      : 'bg-white dark:bg-[#121824] border-slate-200 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-xl flex items-center justify-center shrink-0">
                      {meta.emoji}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                        <span className="text-[10px] font-extrabold text-indigo-500">
                          {ev.category}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-rose-500 text-white animate-pulse">
                            Hoje!
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {ev.title}
                      </h4>

                      {ev.note && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {ev.note}
                        </p>
                      )}

                      <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-3 pt-1">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>{ev.date.split('-').reverse().join('/')}</span>
                        </span>
                        {ev.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{ev.time}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Adicionar ao Planejamento
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Tipo de Compromisso
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['prova', 'trabalho', 'entrega', 'evento'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormType(t)}
                      className={`py-2 px-1.5 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                        formType === t
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-base">{typeMeta[t].emoji}</span>
                      <span>{typeMeta[t].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Prova de Matemática Bimestral"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Data *
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Horário (Opcional)
                  </label>
                  <input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Matéria / Categoria
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Observações e Conteúdo (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Conteúdos que vão cair na prova, requisitos do trabalho..."
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                >
                  Salvar Compromisso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
