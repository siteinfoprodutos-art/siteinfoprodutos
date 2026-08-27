export type FitnessGoal = 
  | 'emagrecer'
  | 'hipertrofia'
  | 'forca'
  | 'definicao'
  | 'condicionamento'
  | 'saude';

export type Gender = 'masculino' | 'feminino' | 'outro';
export type ExperienceLevel = 'iniciante' | 'intermediario' | 'avancado';
export type WorkoutLocation = 'academia' | 'casa' | 'ar_livre' | 'estudio';
export type DaysPerWeek = 2 | 3 | 4 | 5 | 6;

export interface UserFitnessProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  heightCm: number;
  startWeightKg: number;
  currentWeightKg: number;
  targetWeightKg: number;
  goal: FitnessGoal;
  experience: ExperienceLevel;
  location: WorkoutLocation;
  daysPerWeek: DaysPerWeek;
  createdAt: string;
  updatedAt: string;
  avatarId: string;
}

export interface ExerciseSet {
  setNumber: number;
  targetReps: string; // e.g. "8-12" or "15"
  completedReps?: number;
  weightKg?: number;
  isCompleted?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string; // Peito, Costas, Pernas, Ombros, Braços, Abdômen, Cardio
  equipment: string; // Halteres, Barra, Máquina, Peso Corporal
  sets: ExerciseSet[];
  restSeconds: number;
  notes?: string;
  personalRecordKg?: number;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  subtitle: string;
  dayLabel: string; // ex: "Treino A - Segunda"
  focus: string;
  estimatedMinutes: number;
  exercises: Exercise[];
  isCustom?: boolean;
}

export interface CompletedWorkoutRecord {
  id: string;
  routineId: string;
  routineName: string;
  date: string; // ISO String
  durationMinutes: number;
  totalVolumeKg: number;
  exercisesCompleted: number;
  xpEarned: number;
  notes?: string;
}

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  notes?: string;
}

export interface BodyMeasurements {
  id: string;
  date: string; // YYYY-MM-DD
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  rightArmCm?: number;
  leftArmCm?: number;
  rightThighCm?: number;
  leftThighCm?: number;
  notes?: string;
}

export interface EvolutionPhoto {
  id: string;
  date: string;
  imageDataUrl: string;
  caption?: string;
  weightKg?: number;
  type: 'frente' | 'lado' | 'costas' | 'outro';
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'treino' | 'agua' | 'proteina' | 'peso' | 'sono' | 'passos' | 'alongamento';
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'treinos' | 'consistencia' | 'cargas' | 'metas' | 'especial';
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  targetDays: number;
  currentDays: number;
  isCompleted: boolean;
  expiresAt: string;
}

export interface FitnessState {
  isOnboarded: boolean;
  profile: UserFitnessProfile;
  routines: WorkoutRoutine[];
  workoutHistory: CompletedWorkoutRecord[];
  weightHistory: WeightEntry[];
  measurementsHistory: BodyMeasurements[];
  photos: EvolutionPhoto[];
  dailyMissions: DailyMission[];
  lastMissionsDate: string; // YYYY-MM-DD to refresh daily
  achievements: AchievementBadge[];
  challenges: Challenge[];
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  soundEnabled: boolean;
}
