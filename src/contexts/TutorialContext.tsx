import React, { createContext, useContext, useCallback, useState } from 'react';
import type { Tutorial, TutorialStep } from '../types';
import { getTutorialById, getNextStepId, getPreviousStepId } from '../services/tutorial-service';
import { useProgress } from './ProgressContext';

interface TutorialContextValue {
  // Current tutorial state
  currentTutorial: Tutorial | null;
  currentStep: TutorialStep | null;
  currentStepId: string | null;
  isLoading: boolean;
  error: string | null;

  // Navigation
  loadTutorial: (tutorialId: string) => void;
  goToStep: (stepId: string) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;

  // Progress
  canGoNext: boolean;
  canGoPrevious: boolean;
  isStepCompleted: (stepId: string) => boolean;
  markStepComplete: () => void;

  // Progress percentage
  progressPercentage: number;
}

const TutorialContext = createContext<TutorialContextValue | undefined>(undefined);

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const { completeStep, getTutorialProgress } = useProgress();

  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tutorial by ID
  const loadTutorial = useCallback(
    (tutorialId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const tutorial = getTutorialById(tutorialId);
        if (!tutorial) {
          setError(`Tutorial "${tutorialId}" not found`);
          setCurrentTutorial(null);
          setCurrentStepId(null);
          return;
        }

        setCurrentTutorial(tutorial);

        // Get saved progress or start from first step
        const tutorialProgress = getTutorialProgress(tutorialId);
        if (tutorialProgress?.currentStepId) {
          setCurrentStepId(tutorialProgress.currentStepId);
        } else if (tutorial.steps.length > 0) {
          setCurrentStepId(tutorial.steps[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tutorial');
      } finally {
        setIsLoading(false);
      }
    },
    [getTutorialProgress]
  );

  // Get current step
  const currentStep = currentTutorial
    ? currentTutorial.steps.find((s) => s.id === currentStepId) || null
    : null;

  // Go to specific step
  const goToStep = useCallback(
    (stepId: string) => {
      if (!currentTutorial) return;
      const stepExists = currentTutorial.steps.some((s) => s.id === stepId);
      if (stepExists) {
        setCurrentStepId(stepId);
      }
    },
    [currentTutorial]
  );

  // Go to next step
  const goToNextStep = useCallback(() => {
    if (!currentTutorial || !currentStepId) return;
    const nextStepId = getNextStepId(currentTutorial, currentStepId);
    if (nextStepId) {
      setCurrentStepId(nextStepId);
    }
  }, [currentTutorial, currentStepId]);

  // Go to previous step
  const goToPreviousStep = useCallback(() => {
    if (!currentTutorial || !currentStepId) return;
    const prevStepId = getPreviousStepId(currentTutorial, currentStepId);
    if (prevStepId) {
      setCurrentStepId(prevStepId);
    }
  }, [currentTutorial, currentStepId]);

  // Check if can go next/previous
  const canGoNext = currentTutorial && currentStepId
    ? getNextStepId(currentTutorial, currentStepId) !== null
    : false;

  const canGoPrevious = currentTutorial && currentStepId
    ? getPreviousStepId(currentTutorial, currentStepId) !== null
    : false;

  // Check if step is completed
  const isStepCompleted = useCallback(
    (stepId: string) => {
      if (!currentTutorial) return false;
      const tutorialProgress = getTutorialProgress(currentTutorial.id);
      return tutorialProgress?.completedStepIds.includes(stepId) || false;
    },
    [currentTutorial, getTutorialProgress]
  );

  // Mark current step as complete
  const markStepComplete = useCallback(() => {
    if (!currentTutorial || !currentStepId) return;
    completeStep(currentTutorial.id, currentStepId);
  }, [currentTutorial, currentStepId, completeStep]);

  // Calculate progress percentage
  const progressPercentage = currentTutorial
    ? getTutorialProgress(currentTutorial.id)
      ? Math.round(
          (getTutorialProgress(currentTutorial.id)!.completedStepIds.length /
            currentTutorial.steps.length) *
            100
        )
      : 0
    : 0;

  const value: TutorialContextValue = {
    currentTutorial,
    currentStep,
    currentStepId,
    isLoading,
    error,
    loadTutorial,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
    isStepCompleted,
    markStepComplete,
    progressPercentage,
  };

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
