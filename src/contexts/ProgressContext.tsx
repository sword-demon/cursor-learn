import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import type { UserProgress, TutorialProgress, SimulationResult, UserPreferences } from '../types';
import {
  getOrInitUserProgress,
  updateTutorialProgress,
  startTutorial as startTutorialService,
  completeStep,
  completeTutorial,
  recordSimulationResult,
  updatePreferences,
} from '../services/progress-service';

interface ProgressContextValue {
  progress: UserProgress | null;
  isLoading: boolean;
  updateTutorialProgress: (tutorialId: string, updates: Partial<TutorialProgress>) => void;
  startTutorial: (tutorialId: string) => void;
  completeStep: (tutorialId: string, stepId: string) => void;
  completeTutorial: (tutorialId: string) => void;
  recordSimulationResult: (tutorialId: string, result: SimulationResult) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  getTutorialProgress: (tutorialId: string) => TutorialProgress | undefined;
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize progress on mount
  useEffect(() => {
    const initProgress = () => {
      const userProgress = getOrInitUserProgress();
      setProgress(userProgress);
      setIsLoading(false);
    };

    initProgress();
  }, []);

  // Refresh progress from localStorage
  const refreshProgress = useCallback(() => {
    const userProgress = getOrInitUserProgress();
    setProgress(userProgress);
  }, []);

  // Update tutorial progress
  const handleUpdateTutorialProgress = useCallback(
    (tutorialId: string, updates: Partial<TutorialProgress>) => {
      if (!progress) return;
      const updatedProgress = updateTutorialProgress(progress, tutorialId, updates);
      setProgress(updatedProgress);
    },
    [progress]
  );

  // Start a tutorial
  const handleStartTutorial = useCallback(
    (tutorialId: string) => {
      if (!progress) return;
      const updatedProgress = startTutorialService(progress, tutorialId);
      setProgress(updatedProgress);
    },
    [progress]
  );

  // Complete a step
  const handleCompleteStep = useCallback(
    (tutorialId: string, stepId: string) => {
      if (!progress) return;
      const updatedProgress = completeStep(progress, tutorialId, stepId);
      setProgress(updatedProgress);
    },
    [progress]
  );

  // Complete a tutorial
  const handleCompleteTutorial = useCallback(
    (tutorialId: string) => {
      if (!progress) return;
      const updatedProgress = completeTutorial(progress, tutorialId);
      setProgress(updatedProgress);
    },
    [progress]
  );

  // Record simulation result
  const handleRecordSimulationResult = useCallback(
    (tutorialId: string, result: SimulationResult) => {
      if (!progress) return;
      const updatedProgress = recordSimulationResult(progress, tutorialId, result);
      setProgress(updatedProgress);
    },
    [progress]
  );

  // Update preferences
  const handleUpdatePreferences = useCallback(
    (preferences: Partial<UserPreferences>) => {
      if (!progress) return;
      const updatedProgress = updatePreferences(progress, preferences);
      setProgress(updatedProgress);
    },
    [progress]
  );

  // Get tutorial progress
  const getTutorialProgressFn = useCallback(
    (tutorialId: string) => {
      if (!progress) return undefined;
      return progress.tutorials.find((t) => t.tutorialId === tutorialId);
    },
    [progress]
  );

  const value: ProgressContextValue = {
    progress,
    isLoading,
    updateTutorialProgress: handleUpdateTutorialProgress,
    startTutorial: handleStartTutorial,
    completeStep: handleCompleteStep,
    completeTutorial: handleCompleteTutorial,
    recordSimulationResult: handleRecordSimulationResult,
    updatePreferences: handleUpdatePreferences,
    getTutorialProgress: getTutorialProgressFn,
    refreshProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
