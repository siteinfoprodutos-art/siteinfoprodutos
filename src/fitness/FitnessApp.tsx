import React, { useState, useEffect } from 'react';
import { FitnessState, UserFitnessProfile, WorkoutRoutine, CompletedWorkoutRecord, WeightEntry, BodyMeasurements, EvolutionPhoto } from './types';
import { FitnessStorageService } from './services/fitnessStorage';
import { generateWorkoutRoutines } from './services/workoutTemplates';
import { calculateLevel } from './services/gamificationEngine';
import { playWorkoutSound } from './utils/fitnessAudio';

// Components
import { TopHeader } from './components/TopHeader';
import { BottomNav, FitnessTab } from './components/BottomNav';
import { OnboardingModal } from './components/OnboardingModal';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { SettingsModal } from './components/SettingsModal';
import { QuickLogModal } from './components/QuickLogModal';

// Views
import { DashboardView } from './views/DashboardView';
import { JourneyView } from './views/JourneyView';
import { WorkoutsView } from './views/WorkoutsView';
import { EvolutionView } from './views/EvolutionView';
import { AchievementsView } from './views/AchievementsView';

interface FitnessAppProps {
  onBackToStore: () => void;
}

export const FitnessApp: React.FC<FitnessAppProps> = ({ onBackToStore }) => {
  const [state, setState] = useState<FitnessState>(() => FitnessStorageService.loadState());
  const [activeTab, setActiveTab] = useState<FitnessTab>('dashboard');

  // Modals
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showQuickLog, setShowQuickLog] = useState<boolean>(false);
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState<WorkoutRoutine | null>(null);

  // Sync state changes to storage
  const updateFitnessState = (newState: FitnessState) => {
    setState(newState);
    FitnessStorageService.saveState(newState);
  };

  // Onboarding completion
  const handleCompleteOnboarding = (profileData: Partial<UserFitnessProfile>) => {
    const updatedProfile: UserFitnessProfile = {
      ...state.profile,
      ...profileData,
      updatedAt: new Date().toISOString(),
    } as UserFitnessProfile;

    const newRoutines = generateWorkoutRoutines(
      updatedProfile.goal,
      updatedProfile.experience,
      updatedProfile.location,
      updatedProfile.daysPerWeek
    );

    const initialWeightEntry: WeightEntry = {
      id: `w-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weightKg: updatedProfile.startWeightKg,
      notes: 'Ponto de Partida',
    };

    const newState: FitnessState = {
      ...state,
      isOnboarded: true,
      profile: updatedProfile,
      routines: newRoutines,
      weightHistory: [initialWeightEntry],
      xp: state.xp + 100, // Onboarding bonus
    };

    if (state.soundEnabled) {
      playWorkoutSound('levelup');
    }

    updateFitnessState(newState);
  };

  // Workout finished
  const handleFinishWorkout = (record: CompletedWorkoutRecord) => {
    const updatedHistory = [record, ...state.workoutHistory];
    const newXp = state.xp + record.xpEarned;
    const newLevel = calculateLevel(newXp).level;

    // Check if daily workout mission is completed
    const updatedMissions = state.dailyMissions.map((m) => {
      if (m.type === 'treino') {
        return { ...m, isCompleted: true };
      }
      return m;
    });

    const newState: FitnessState = {
      ...state,
      workoutHistory: updatedHistory,
      xp: newXp,
      level: newLevel,
      dailyMissions: updatedMissions,
    };

    updateFitnessState(newState);
  };

  // Toggle mission
  const handleToggleMission = (missionId: string) => {
    const targetMission = state.dailyMissions.find((m) => m.id === missionId);
    if (!targetMission) return;

    const willBeCompleted = !targetMission.isCompleted;
    const xpDelta = willBeCompleted ? targetMission.xpReward : -targetMission.xpReward;

    const updatedMissions = state.dailyMissions.map((m) => {
      if (m.id === missionId) {
        return { ...m, isCompleted: willBeCompleted };
      }
      return m;
    });

    const newXp = Math.max(0, state.xp + xpDelta);
    const newLevel = calculateLevel(newXp).level;

    if (willBeCompleted && state.soundEnabled) {
      playWorkoutSound('streak');
    }

    const newState: FitnessState = {
      ...state,
      dailyMissions: updatedMissions,
      xp: newXp,
      level: newLevel,
    };

    updateFitnessState(newState);
  };

  // Weight entry
  const handleSaveWeight = (entry: WeightEntry) => {
    const updatedWeights = [...state.weightHistory, entry];
    const newXp = state.xp + 30;

    const newState: FitnessState = {
      ...state,
      weightHistory: updatedWeights,
      profile: {
        ...state.profile,
        currentWeightKg: entry.weightKg,
      },
      xp: newXp,
      level: calculateLevel(newXp).level,
    };

    if (state.soundEnabled) {
      playWorkoutSound('streak');
    }

    updateFitnessState(newState);
  };

  // Measurements entry
  const handleSaveMeasurements = (entry: BodyMeasurements) => {
    const updated = [...state.measurementsHistory, entry];
    const newXp = state.xp + 50;

    const newState: FitnessState = {
      ...state,
      measurementsHistory: updated,
      xp: newXp,
      level: calculateLevel(newXp).level,
    };

    if (state.soundEnabled) {
      playWorkoutSound('streak');
    }

    updateFitnessState(newState);
  };

  // Photos
  const handleAddPhoto = (photo: EvolutionPhoto) => {
    const updatedPhotos = [...state.photos, photo];
    const newXp = state.xp + 80;

    const newState: FitnessState = {
      ...state,
      photos: updatedPhotos,
      xp: newXp,
      level: calculateLevel(newXp).level,
    };

    if (state.soundEnabled) {
      playWorkoutSound('levelup');
    }

    updateFitnessState(newState);
  };

  const handleDeletePhoto = (photoId: string) => {
    const filtered = state.photos.filter((p) => p.id !== photoId);
    updateFitnessState({ ...state, photos: filtered });
  };

  const pendingMissionsCount = state.dailyMissions.filter((m) => !m.isCompleted).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased">
      {/* Top Header */}
      <TopHeader
        profile={state.profile}
        xp={state.xp}
        streakDays={state.streakDays}
        onOpenSettings={() => setShowSettings(true)}
        onBackToStore={onBackToStore}
      />

      {/* Main Tab Views */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <DashboardView
            state={state}
            onStartWorkout={(routine) => setActiveWorkoutRoutine(routine)}
            onToggleMission={handleToggleMission}
            onOpenQuickLog={() => setShowQuickLog(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'journey' && (
          <JourneyView
            state={state}
            onStartNextWorkout={() => setActiveWorkoutRoutine(state.routines[0] || null)}
          />
        )}

        {activeTab === 'workouts' && (
          <WorkoutsView
            state={state}
            onStartWorkout={(routine) => setActiveWorkoutRoutine(routine)}
          />
        )}

        {activeTab === 'evolution' && (
          <EvolutionView
            state={state}
            onAddWeight={handleSaveWeight}
            onAddMeasurements={handleSaveMeasurements}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
            onOpenQuickLog={() => setShowQuickLog(true)}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView state={state} />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        pendingMissionsCount={pendingMissionsCount}
      />

      {/* Onboarding Gate */}
      {!state.isOnboarded && (
        <OnboardingModal
          onComplete={handleCompleteOnboarding}
          initialProfile={state.profile}
        />
      )}

      {/* Active Workout Tracker */}
      {activeWorkoutRoutine && (
        <ActiveWorkoutModal
          routine={activeWorkoutRoutine}
          soundEnabled={state.soundEnabled}
          onFinishWorkout={handleFinishWorkout}
          onClose={() => setActiveWorkoutRoutine(null)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          state={state}
          onUpdateState={updateFitnessState}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Quick Log Modal */}
      {showQuickLog && (
        <QuickLogModal
          currentWeight={state.profile.currentWeightKg}
          onSaveWeight={handleSaveWeight}
          onSaveMeasurements={handleSaveMeasurements}
          onClose={() => setShowQuickLog(false)}
        />
      )}
    </div>
  );
};
