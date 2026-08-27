import { DailyMission, AchievementBadge, FitnessGoal, UserFitnessProfile, CompletedWorkoutRecord, WeightEntry } from '../types';

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  currentLevelXp: number;
  xpForNextLevel: number;
  progressPercent: number;
}

export const LEVEL_TITLES: { [level: number]: string } = {
  1: 'Iniciante Determinado',
  2: 'Buscador de Hábitos',
  3: 'Guerreiro do Primeiro Mês',
  4: 'Focado & Constante',
  5: 'Atleta em Ascensão',
  6: 'Construtor de Força',
  7: 'Mestre da Disciplina',
  8: 'Titã dos Treinos',
  9: 'Lorde da Hipertrofia',
  10: 'Máquina Imparável',
  11: 'Guardião do Ferro',
  12: 'Lenda da Superação',
  13: 'Elite Física',
  14: 'Mestre Supremo do Físico',
  15: 'Lenda Imortal dos Treinos',
  16: 'Colosso do Aço',
  17: 'Semideus da Performance',
  18: 'Vanguarda do Fitness',
  19: 'Monarca da Transformação',
  20: 'Físico Transcendental',
};

export function calculateLevel(xp: number): LevelInfo {
  // XP formula: base 200 XP per level with mild scaling
  let level = 1;
  let requiredXp = 0;
  let nextXp = 250;

  while (xp >= nextXp && level < 20) {
    level++;
    requiredXp = nextXp;
    nextXp = requiredXp + 250 + (level * 100);
  }

  const currentLevelXp = xp - requiredXp;
  const xpForNextLevel = nextXp - requiredXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXp / xpForNextLevel) * 100)));

  return {
    level,
    title: LEVEL_TITLES[level] || `Mestre Nível ${level}`,
    minXp: requiredXp,
    maxXp: nextXp,
    currentLevelXp,
    xpForNextLevel,
    progressPercent,
  };
}

export function generateDailyMissions(goal: FitnessGoal, dateStr: string): DailyMission[] {
  const goalSpecificMission: DailyMission = goal === 'emagrecer'
    ? {
        id: `mission-cardio-${dateStr}`,
        title: 'Queima & Movimento',
        description: 'Faça 20 minutos de caminhada, esteira ou cardio.',
        xpReward: 60,
        type: 'passos',
        targetCount: 1,
        currentCount: 0,
        isCompleted: false,
      }
    : goal === 'forca' || goal === 'hipertrofia'
    ? {
        id: `mission-protein-${dateStr}`,
        title: 'Bater Meta de Proteína',
        description: 'Consuma fontes de proteína magra em pelo menos 3 refeições hoje.',
        xpReward: 60,
        type: 'proteina',
        targetCount: 1,
        currentCount: 0,
        isCompleted: false,
      }
    : {
        id: `mission-stretch-${dateStr}`,
        title: 'Alongamento & Mobilidade',
        description: 'Dedique 10 minutos para mobilidade articular e alongamentos.',
        xpReward: 50,
        type: 'alongamento',
        targetCount: 1,
        currentCount: 0,
        isCompleted: false,
      };

  return [
    {
      id: `mission-workout-${dateStr}`,
      title: 'Treino Concluído',
      description: 'Execute sua rotina de treino programada com foco total.',
      xpReward: 120,
      type: 'treino',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false,
    },
    {
      id: `mission-water-${dateStr}`,
      title: 'Hidratação Essencial',
      description: 'Beba no mínimo 2,5 litros de água ao longo do dia.',
      xpReward: 50,
      type: 'agua',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false,
    },
    goalSpecificMission,
    {
      id: `mission-sleep-${dateStr}`,
      title: 'Sono Reparador',
      description: 'Garanta entre 7 e 8 horas de sono de qualidade para recuperação muscular.',
      xpReward: 50,
      type: 'sono',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false,
    },
  ];
}

export function getDefaultAchievements(): AchievementBadge[] {
  return [
    {
      id: 'first-step',
      title: 'Primeiro Passo',
      description: 'Concluiu o primeiro treino no aplicativo.',
      icon: 'Footprints',
      xpReward: 100,
      category: 'treinos',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'iron-3',
      title: 'Trio de Ferro',
      description: 'Completou 3 treinos registrados no total.',
      icon: 'Dumbbell',
      xpReward: 150,
      category: 'treinos',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'streak-7',
      title: 'Chama Olímpica',
      description: 'Manteve 7 dias consecutivos de streak ativo.',
      icon: 'Flame',
      xpReward: 250,
      category: 'consistencia',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'heavy-lifter',
      title: 'Titã das Cargas',
      description: 'Registrou uma nova carga máxima pessoal (PR).',
      icon: 'Trophy',
      xpReward: 200,
      category: 'cargas',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'master-10',
      title: 'Disciplina Implacável',
      description: 'Completou 10 treinos no aplicativo.',
      icon: 'Medal',
      xpReward: 350,
      category: 'treinos',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'weight-tracker',
      title: 'Bússola do Progresso',
      description: 'Registrou seu peso ou medidas por 3 vezes.',
      icon: 'Scale',
      xpReward: 150,
      category: 'metas',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'level-5',
      title: 'Atleta Consagrado',
      description: 'Alcançou o Nível 5 de evolução gamificada.',
      icon: 'Crown',
      xpReward: 500,
      category: 'especial',
      isUnlocked: false,
      progress: 0,
    },
    {
      id: 'transform-photo',
      title: 'Espelho da Verdade',
      description: 'Adicionou sua primeira foto na galeria de evolução.',
      icon: 'Camera',
      xpReward: 150,
      category: 'metas',
      isUnlocked: false,
      progress: 0,
    },
  ];
}

export interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  targetDescription: string;
  isPassed: boolean;
  isCurrent: boolean;
  order: number;
}

export function generateJourneyMilestones(
  profile: UserFitnessProfile,
  workoutsCount: number,
  currentWeight: number,
  streakDays: number
): JourneyMilestone[] {
  const goal = profile.goal;
  const startW = profile.startWeightKg;
  const targetW = profile.targetWeightKg;
  const diffTotal = Math.abs(targetW - startW);
  const diffCurrent = Math.abs(currentWeight - startW);

  if (goal === 'emagrecer') {
    return [
      {
        id: 'm1',
        title: 'Fase 1: Despertar Metabólico',
        description: 'Adaptação do corpo, redução de retenção de líquidos e criação do hábito de treinar.',
        targetDescription: 'Primeiras 2 semanas de consistência (5+ treinos)',
        isPassed: workoutsCount >= 5,
        isCurrent: workoutsCount < 5,
        order: 1,
      },
      {
        id: 'm2',
        title: 'Fase 2: Queima Constante',
        description: 'Primeira redução visível na balança e medidas de cintura diminuindo.',
        targetDescription: `Perda de ${(diffTotal * 0.3).toFixed(1)}kg e 12+ treinos`,
        isPassed: (startW - currentWeight) >= (diffTotal * 0.3) && workoutsCount >= 12,
        isCurrent: workoutsCount >= 5 && ((startW - currentWeight) < (diffTotal * 0.3) || workoutsCount < 12),
        order: 2,
      },
      {
        id: 'm3',
        title: 'Fase 3: Transformação & Definição',
        description: 'Aceleração dos resultados, tônus muscular evidente e maior disposição no dia a dia.',
        targetDescription: `Perda de ${(diffTotal * 0.7).toFixed(1)}kg e 25+ treinos`,
        isPassed: (startW - currentWeight) >= (diffTotal * 0.7) && workoutsCount >= 25,
        isCurrent: (startW - currentWeight) >= (diffTotal * 0.3) && ((startW - currentWeight) < (diffTotal * 0.7) || workoutsCount < 25),
        order: 3,
      },
      {
        id: 'm4',
        title: 'Fase 4: Meta Conquistada & Manutenção',
        description: 'Físico transformado, novo estilo de vida consolidado e saúde no ápice.',
        targetDescription: `Peso alvo (${targetW}kg) atingido e 40+ treinos`,
        isPassed: currentWeight <= targetW && workoutsCount >= 30,
        isCurrent: (startW - currentWeight) >= (diffTotal * 0.7) && (currentWeight > targetW || workoutsCount < 30),
        order: 4,
      },
    ];
  }

  if (goal === 'hipertrofia' || goal === 'forca') {
    return [
      {
        id: 'm1',
        title: 'Fase 1: Conexão Mente-Músculo',
        description: 'Ajuste postural, biomecânica dos exercícios e domínio das técnicas fundamentais.',
        targetDescription: 'Completar os primeiros 6 treinos com técnica sólida',
        isPassed: workoutsCount >= 6,
        isCurrent: workoutsCount < 6,
        order: 1,
      },
      {
        id: 'm2',
        title: 'Fase 2: Sobrecarga Progressiva',
        description: 'Aumento contínuo de cargas, ganho de força e densidade muscular inicial.',
        targetDescription: '15+ treinos concluídos e progressão de peso nos compostos',
        isPassed: workoutsCount >= 15,
        isCurrent: workoutsCount >= 6 && workoutsCount < 15,
        order: 2,
      },
      {
        id: 'm3',
        title: 'Fase 3: Volume & Densidade Notáveis',
        description: 'Músculos visivelmente maiores e mais densos, braços e pernas mais preenchidos.',
        targetDescription: `Ganho de ${(diffTotal * 0.6).toFixed(1)}kg de massa magra e 30+ treinos`,
        isPassed: workoutsCount >= 30,
        isCurrent: workoutsCount >= 15 && workoutsCount < 30,
        order: 3,
      },
      {
        id: 'm4',
        title: 'Fase 4: Físico Poderoso & Imponente',
        description: 'Volume muscular de respeito, força expressiva e consistência inabalável.',
        targetDescription: `Meta atingida (${targetW}kg) e 50+ treinos`,
        isPassed: workoutsCount >= 50,
        isCurrent: workoutsCount >= 30 && workoutsCount < 50,
        order: 4,
      },
    ];
  }

  // Definicao, Condicionamento, Saude
  return [
    {
      id: 'm1',
      title: 'Fase 1: Fundação & Frequência',
      description: 'Estabelecer a rotina semanal sem faltas e ativar o condicionamento cardiovascular.',
      targetDescription: '5 treinos e 7 dias de streak',
      isPassed: workoutsCount >= 5 && streakDays >= 3,
      isCurrent: workoutsCount < 5 || streakDays < 3,
      order: 1,
    },
    {
      id: 'm2',
      title: 'Fase 2: Resistência & Definição',
      description: 'Treinos mais intensos, menor fadiga e redução no percentual de gordura.',
      targetDescription: '15 treinos concluídos e evolução nas cargas',
      isPassed: workoutsCount >= 15,
      isCurrent: workoutsCount >= 5 && workoutsCount < 15,
      order: 2,
    },
    {
      id: 'm3',
      title: 'Fase 3: Alta Performance & Tônus',
      description: 'Corpo desenhado, excelente capacidade pulmonar e resistência de atleta.',
      targetDescription: '30 treinos concluídos e medidas ideais',
      isPassed: workoutsCount >= 30,
      isCurrent: workoutsCount >= 15 && workoutsCount < 30,
      order: 3,
    },
    {
      id: 'm4',
      title: 'Fase 4: Maestria do Corpo & Longevidade',
      description: 'Estilo de vida atlético definitivo e corpo em sua melhor versão histórica.',
      targetDescription: '50 treinos e transformação completa',
      isPassed: workoutsCount >= 50,
      isCurrent: workoutsCount >= 30 && workoutsCount < 50,
      order: 4,
    },
  ];
}
