// IndexedDB & Local Storage Service for AL Studio Foco
// 100% Client-Side, Zero External Database, Offline-First

export interface FocoTask {
  id: string;
  title: string;
  category: string;
  date: string; // YYYY-MM-DD
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  status: 'pending' | 'completed';
  note?: string;
  createdAt: string;
  completedAt?: string;
}

export interface FocoCategory {
  id: string;
  name: string;
  color: string;
  isCustom?: boolean;
}

export interface FocoSession {
  id: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  startTime: string;
  endTime: string;
  category: string;
  note?: string;
  completed: boolean;
}

export interface FocoEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  type: 'prova' | 'trabalho' | 'entrega' | 'evento';
  category: string;
  note?: string;
}

export interface FocoSettings {
  userName: string;
  avatar: string;
  dailyGoalMinutes: number;
  weeklyGoalHours: number;
  soundEnabled: boolean;
  theme: 'dark' | 'light' | 'system';
  streakDays: number;
  lastActiveDate: string;
}

export interface FocoBackupData {
  tasks: FocoTask[];
  categories: FocoCategory[];
  sessions: FocoSession[];
  events: FocoEvent[];
  settings: FocoSettings;
  exportedAt: string;
  version: string;
}

const DB_NAME = 'ALStudioFocoDB';
const DB_VERSION = 1;

export const DEFAULT_CATEGORIES: FocoCategory[] = [
  { id: 'matematica', name: 'Matemática', color: '#3b82f6' },
  { id: 'portugues', name: 'Português', color: '#ec4899' },
  { id: 'historia', name: 'História', color: '#eab308' },
  { id: 'geografia', name: 'Geografia', color: '#10b981' },
  { id: 'ingles', name: 'Inglês', color: '#8b5cf6' },
  { id: 'ciencias', name: 'Ciências', color: '#06b6d4' },
  { id: 'trabalho-escolar', name: 'Trabalho escolar', color: '#f97316' },
  { id: 'outros', name: 'Outros', color: '#64748b' },
];

export const DEFAULT_SETTINGS: FocoSettings = {
  userName: 'Estudante',
  avatar: '🚀',
  dailyGoalMinutes: 60,
  weeklyGoalHours: 7,
  soundEnabled: true,
  theme: 'dark',
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getInitialSampleTasks(): FocoTask[] {
  const today = getTodayString();
  return [
    {
      id: 'task-1',
      title: 'Revisar fórmulas de Física e Termodinâmica',
      category: 'Ciências',
      date: today,
      priority: 'alta',
      status: 'pending',
      note: 'Focar nos exercícios do capítulo 5.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Leitura do capítulo 4 de História Geral',
      category: 'História',
      date: today,
      priority: 'media',
      status: 'pending',
      note: 'Fazer fichamento dos tópicos principais.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-3',
      title: 'Resolver 10 questões de Matemática (Equações)',
      category: 'Matemática',
      date: today,
      priority: 'urgente',
      status: 'completed',
      note: 'Lista de exercícios entregue pelo professor.',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    },
  ];
}

function getInitialSampleSessions(): FocoSession[] {
  const today = getTodayString();
  return [
    {
      id: 'sess-1',
      date: today,
      durationMinutes: 25,
      startTime: '09:00',
      endTime: '09:25',
      category: 'Matemática',
      note: 'Resolução de exercícios',
      completed: true,
    },
    {
      id: 'sess-2',
      date: today,
      durationMinutes: 15,
      startTime: '10:30',
      endTime: '10:45',
      category: 'História',
      note: 'Leitura rápida',
      completed: true,
    },
  ];
}

function getInitialSampleEvents(): FocoEvent[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 5);

  return [
    {
      id: 'event-1',
      title: 'Prova Bimestral de Matemática',
      date: tomorrow.toISOString().split('T')[0],
      time: '08:00',
      type: 'prova',
      category: 'Matemática',
      note: 'Conteúdo: Matrizes, Determinantes e Geometria.',
    },
    {
      id: 'event-2',
      title: 'Entrega do Trabalho de Geografia',
      date: nextWeek.toISOString().split('T')[0],
      time: '14:00',
      type: 'trabalho',
      category: 'Geografia',
      note: 'Apresentação em slides sobre biomas brasileiros.',
    },
  ];
}

// IndexedDB Helper
class FocoIndexedDB {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private openDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not supported in this environment'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('events')) {
          db.createObjectStore('events', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result as T[]);
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Fallback to localStorage
      const local = localStorage.getItem(`foco_${storeName}`);
      return local ? JSON.parse(local) : [];
    }
  }

  async put<T extends { id?: string; key?: string }>(storeName: string, item: T): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(item);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Fallback to localStorage sync
      const list = await this.getAll<T>(storeName);
      const key = item.id || item.key;
      const index = list.findIndex((i) => (i.id || i.key) === key);
      if (index >= 0) {
        list[index] = item;
      } else {
        list.push(item);
      }
      localStorage.setItem(`foco_${storeName}`, JSON.stringify(list));
    }
  }

  async delete(storeName: string, key: string): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      const list = await this.getAll<{ id?: string; key?: string }>(storeName);
      const filtered = list.filter((i) => (i.id || i.key) !== key);
      localStorage.setItem(`foco_${storeName}`, JSON.stringify(filtered));
    }
  }

  async clearStore(storeName: string): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      localStorage.removeItem(`foco_${storeName}`);
    }
  }
}

const idb = new FocoIndexedDB();

// Main Service API
export const focoService = {
  async initData(): Promise<void> {
    try {
      const categories = await idb.getAll<FocoCategory>('categories');
      if (!categories || categories.length === 0) {
        for (const cat of DEFAULT_CATEGORIES) {
          await idb.put('categories', cat);
        }
      }

      const tasks = await idb.getAll<FocoTask>('tasks');
      if (!tasks || tasks.length === 0) {
        for (const task of getInitialSampleTasks()) {
          await idb.put('tasks', task);
        }
      }

      const sessions = await idb.getAll<FocoSession>('sessions');
      if (!sessions || sessions.length === 0) {
        for (const sess of getInitialSampleSessions()) {
          await idb.put('sessions', sess);
        }
      }

      const events = await idb.getAll<FocoEvent>('events');
      if (!events || events.length === 0) {
        for (const ev of getInitialSampleEvents()) {
          await idb.put('events', ev);
        }
      }

      const settings = await this.getSettings();
      if (!settings) {
        await this.saveSettings(DEFAULT_SETTINGS);
      } else {
        // Update streak logic
        const today = getTodayString();
        if (settings.lastActiveDate !== today) {
          const lastDate = new Date(settings.lastActiveDate);
          const currDate = new Date(today);
          const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            settings.streakDays += 1;
          } else if (diffDays > 1) {
            settings.streakDays = 1;
          }
          settings.lastActiveDate = today;
          await this.saveSettings(settings);
        }
      }
    } catch (err) {
      console.warn('Error during focoService.initData():', err);
    }
  },

  // Tasks
  async getTasks(): Promise<FocoTask[]> {
    return idb.getAll<FocoTask>('tasks');
  },

  async saveTask(task: FocoTask): Promise<void> {
    await idb.put('tasks', task);
  },

  async deleteTask(taskId: string): Promise<void> {
    await idb.delete('tasks', taskId);
  },

  async toggleTask(taskId: string): Promise<FocoTask | null> {
    const tasks = await this.getTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return null;

    task.status = task.status === 'completed' ? 'pending' : 'completed';
    task.completedAt = task.status === 'completed' ? new Date().toISOString() : undefined;
    await idb.put('tasks', task);
    return task;
  },

  // Categories
  async getCategories(): Promise<FocoCategory[]> {
    const list = await idb.getAll<FocoCategory>('categories');
    return list && list.length > 0 ? list : DEFAULT_CATEGORIES;
  },

  async saveCategory(cat: FocoCategory): Promise<void> {
    await idb.put('categories', cat);
  },

  async deleteCategory(categoryId: string): Promise<void> {
    await idb.delete('categories', categoryId);
  },

  // Sessions
  async getSessions(): Promise<FocoSession[]> {
    return idb.getAll<FocoSession>('sessions');
  },

  async saveSession(session: FocoSession): Promise<void> {
    await idb.put('sessions', session);
  },

  async deleteSession(sessionId: string): Promise<void> {
    await idb.delete('sessions', sessionId);
  },

  // Events (Calendar/Planning)
  async getEvents(): Promise<FocoEvent[]> {
    return idb.getAll<FocoEvent>('events');
  },

  async saveEvent(event: FocoEvent): Promise<void> {
    await idb.put('events', event);
  },

  async deleteEvent(eventId: string): Promise<void> {
    await idb.delete('events', eventId);
  },

  // Settings
  async getSettings(): Promise<FocoSettings> {
    try {
      const items = await idb.getAll<{ key: string; value: FocoSettings }>('settings');
      const found = items.find((i) => i.key === 'config');
      return found ? found.value : DEFAULT_SETTINGS;
    } catch {
      const local = localStorage.getItem('foco_settings');
      return local ? JSON.parse(local) : DEFAULT_SETTINGS;
    }
  },

  async saveSettings(settings: FocoSettings): Promise<void> {
    await idb.put('settings', { key: 'config', value: settings });
    localStorage.setItem('foco_settings', JSON.stringify(settings));
  },

  // Backup: Export / Import JSON
  async exportBackup(): Promise<string> {
    const [tasks, categories, sessions, events, settings] = await Promise.all([
      this.getTasks(),
      this.getCategories(),
      this.getSessions(),
      this.getEvents(),
      this.getSettings(),
    ]);

    const backup: FocoBackupData = {
      tasks,
      categories,
      sessions,
      events,
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };

    return JSON.stringify(backup, null, 2);
  },

  async importBackup(jsonString: string): Promise<boolean> {
    try {
      const data: FocoBackupData = JSON.parse(jsonString);
      if (!data.tasks || !data.settings) {
        throw new Error('Arquivo de backup inválido');
      }

      await idb.clearStore('tasks');
      for (const t of data.tasks) await idb.put('tasks', t);

      if (data.categories) {
        await idb.clearStore('categories');
        for (const c of data.categories) await idb.put('categories', c);
      }

      if (data.sessions) {
        await idb.clearStore('sessions');
        for (const s of data.sessions) await idb.put('sessions', s);
      }

      if (data.events) {
        await idb.clearStore('events');
        for (const e of data.events) await idb.put('events', e);
      }

      if (data.settings) {
        await this.saveSettings(data.settings);
      }

      return true;
    } catch (err) {
      console.error('Failed to import backup:', err);
      return false;
    }
  },

  async resetAllData(): Promise<void> {
    await idb.clearStore('tasks');
    await idb.clearStore('categories');
    await idb.clearStore('sessions');
    await idb.clearStore('events');
    await idb.clearStore('settings');
    localStorage.removeItem('foco_settings');
    await this.initData();
  },
};
