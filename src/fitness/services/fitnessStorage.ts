import { FitnessState, UserFitnessProfile, DailyMission } from '../types';
import { generateWorkoutRoutines } from './workoutTemplates';
import { calculateLevel, generateDailyMissions, getDefaultAchievements } from './gamificationEngine';

const STORAGE_KEY = 'al_fitness_state_v1';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultFitnessState(): FitnessState {
  const today = getTodayDateString();
  const defaultProfile: UserFitnessProfile = {
    id: 'user-default',
    name: 'Atleta',
    gender: 'masculino',
    age: 26,
    heightCm: 175,
    startWeightKg: 78,
    currentWeightKg: 78,
    targetWeightKg: 73,
    goal: 'emagrecer',
    experience: 'iniciante',
    location: 'academia',
    daysPerWeek: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatarId: '1',
  };

  const defaultRoutines = generateWorkoutRoutines(
    defaultProfile.goal,
    defaultProfile.experience,
    defaultProfile.location,
    defaultProfile.daysPerWeek
  );

  return {
    isOnboarded: false,
    profile: defaultProfile,
    routines: defaultRoutines,
    workoutHistory: [],
    weightHistory: [
      { id: 'w-1', date: today, weightKg: defaultProfile.startWeightKg, notes: 'Peso inicial' },
    ],
    measurementsHistory: [],
    photos: [],
    dailyMissions: generateDailyMissions(defaultProfile.goal, today),
    lastMissionsDate: today,
    achievements: getDefaultAchievements(),
    challenges: [
      {
        id: 'c-1',
        title: 'Semana de Aço',
        description: 'Complete 4 treinos nos próximos 7 dias.',
        xpReward: 300,
        targetDays: 4,
        currentDays: 0,
        isCompleted: false,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'c-2',
        title: 'Mestre da Hidratação',
        description: 'Cumpra a missão de água por 5 dias.',
        xpReward: 200,
        targetDays: 5,
        currentDays: 0,
        isCompleted: false,
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    xp: 50,
    level: 1,
    streakDays: 1,
    lastActiveDate: today,
    soundEnabled: true,
  };
}

export class FitnessStorageService {
  public static loadState(): FitnessState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return getDefaultFitnessState();
      }
      const parsed: FitnessState = JSON.parse(raw);
      const today = getTodayDateString();

      // Check and update streak
      let updatedStreak = parsed.streakDays || 1;
      if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
        const lastDate = new Date(parsed.lastActiveDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          updatedStreak += 1;
        } else if (diffDays > 1) {
          updatedStreak = 1; // reset streak if missed a day
        }
      }

      // Check if daily missions need refresh
      let currentMissions = parsed.dailyMissions;
      if (parsed.lastMissionsDate !== today) {
        currentMissions = generateDailyMissions(parsed.profile?.goal || 'emagrecer', today);
      }

      // Recalculate level
      const levelInfo = calculateLevel(parsed.xp || 0);

      const state: FitnessState = {
        ...parsed,
        streakDays: updatedStreak,
        lastActiveDate: today,
        dailyMissions: currentMissions,
        lastMissionsDate: today,
        level: levelInfo.level,
      };

      FitnessStorageService.saveState(state);
      return state;
    } catch (e) {
      console.warn('Erro ao carregar fitness state:', e);
      return getDefaultFitnessState();
    }
  }

  public static saveState(state: FitnessState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Erro ao salvar fitness state:', e);
    }
  }

  public static exportDataAsJSON(): string {
    const state = FitnessStorageService.loadState();
    return JSON.stringify(state, null, 2);
  }

  public static importDataFromJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed.xp === 'number' && parsed.profile) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Falha ao importar backup do fitness:', e);
      return false;
    }
  }

  public static resetState(): FitnessState {
    const defaultState = getDefaultFitnessState();
    FitnessStorageService.saveState(defaultState);
    return defaultState;
  }
}
