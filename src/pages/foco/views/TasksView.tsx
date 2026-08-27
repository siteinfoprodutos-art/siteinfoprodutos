import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit3, 
  Calendar, 
  Tag, 
  AlertCircle, 
  X, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { FocoTask, FocoCategory, focoService } from '../../../services/focoStorage';

interface TasksViewProps {
  tasks: FocoTask[];
  categories: FocoCategory[];
  onRefresh: () => void;
  onToggleTask: (taskId: string) => void;
}

export function TasksView({
  tasks,
  categories,
  onRefresh,
  onToggleTask,
}: TasksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<FocoTask | null>(null);

  // New Category Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#6366f1');

  // Task form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Matemática');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formPriority, setFormPriority] = useState<'baixa' | 'media' | 'alta' | 'urgente'>('media');
  const [formNote, setFormNote] = useState('');

  const openCreateModal = () => {
    setEditingTask(null);
    setFormTitle('');
    setFormCategory(categories[0]?.name || 'Matemática');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormPriority('media');
    setFormNote('');
    setIsModalOpen(true);
  };

  const openEditModal = (task: FocoTask) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormCategory(task.category);
    setFormDate(task.date);
    setFormPriority(task.priority);
    setFormNote(task.note || '');
    setIsModalOpen(true);
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingTask) {
      const updated: FocoTask = {
        ...editingTask,
        title: formTitle.trim(),
        category: formCategory,
        date: formDate,
        priority: formPriority,
        note: formNote.trim(),
      };
      await focoService.saveTask(updated);
    } else {
      const newTask: FocoTask = {
        id: `task-${Date.now()}`,
        title: formTitle.trim(),
        category: formCategory,
        date: formDate,
        priority: formPriority,
        status: 'pending',
        note: formNote.trim(),
        createdAt: new Date().toISOString(),
      };
      await focoService.saveTask(newTask);
    }

    setIsModalOpen(false);
    onRefresh();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      await focoService.deleteTask(taskId);
      onRefresh();
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCat: FocoCategory = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      color: newCategoryColor,
      isCustom: true,
    };

    await focoService.saveCategory(newCat);
    setNewCategoryName('');
    setIsCategoryModalOpen(false);
    onRefresh();
    setFormCategory(newCat.name);
  };

  // Filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.note && task.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || task.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'pending' && task.status === 'pending') ||
        (selectedStatus === 'completed' && task.status === 'completed');

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [tasks, searchQuery, selectedCategory, selectedStatus]);

  const priorityColors = {
    baixa: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    media: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    alta: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    urgente: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
  };

  return (
    <div id="foco-tasks-view" className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Tarefas & Matérias ✅
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Organize seus afazeres escolares e pessoais por matéria e prioridade.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>+ Matéria</span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Tarefa</span>
          </button>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar por título, matéria ou observação..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-xs"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedStatus('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Todas ({tasks.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus('pending')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedStatus === 'pending'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Pendentes ({tasks.filter((t) => t.status === 'pending').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus('completed')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedStatus === 'completed'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Concluídas ({tasks.filter((t) => t.status === 'completed').length})
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Todas as matérias
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.name
                  ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Task List */}
      {filteredTasks.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3 shadow-xs">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
              ? 'Tente ajustar os filtros ou termo de busca acima.'
              : 'Comece adicionando suas atividades para manter a rotina de estudos organizada.'}
          </p>
          <button
            type="button"
            onClick={openCreateModal}
            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-500/20"
          >
            + Criar primeira tarefa
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => {
            const catObj = categories.find((c) => c.name === task.category);
            const isCompleted = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCompleted
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                    : 'bg-white dark:bg-[#121824] border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-xs'
                }`}
              >
                {/* Checkbox & Title */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-500" />
                    )}
                  </button>

                  <div className="min-w-0 space-y-1">
                    <h4
                      className={`text-sm font-bold leading-snug ${
                        isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.note && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {task.note}
                      </p>
                    )}

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {/* Category */}
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${catObj?.color || '#6366f1'}15`,
                          color: catObj?.color || '#6366f1',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: catObj?.color || '#6366f1' }}
                        />
                        <span>{task.category}</span>
                      </span>

                      {/* Priority */}
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>

                      {/* Date */}
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {task.date
                            .split('-')
                            .reverse()
                            .slice(0, 2)
                            .join('/')}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => openEditModal(task)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Editar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Resolver lista de Física cap. 4"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                    Data de Execução
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Prioridade
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['baixa', 'media', 'alta', 'urgente'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormPriority(p)}
                      className={`py-2 px-2 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-all ${
                        formPriority === p
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Observações (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalhes, páginas do livro ou links úteis..."
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
                  className="py-2.5 px-5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
                >
                  {editingTask ? 'Salvar Alterações' : 'Criar Tarefa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Custom Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Nova Matéria / Categoria
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Nome da Matéria
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Filosofia, Robótica, etc."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Cor da Tag
                </label>
                <div className="flex items-center gap-2">
                  {['#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316', '#64748b'].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewCategoryColor(color)}
                        className={`w-7 h-7 rounded-full transition-transform ${
                          newCategoryColor === color ? 'scale-125 ring-2 ring-indigo-500' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                >
                  Salvar Matéria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
