import type { UserProgress, TutorialProgress, SimulationResult, UserPreferences } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId, formatDate } from '../utils/helpers';

const defaultPreferences: UserPreferences = {
  os: null,
  theme: 'system',
  editorFontSize: 14,
  reduceMotion: false,
};

const defaultStats = {
  totalTutorialsCompleted: 0,
  totalStepsCompleted: 0,
  totalTimeSpent: 0,
};

/**
 * Initialize user progress
 */
export function initUserProgress(): UserProgress {
  const userId = generateId();
  const now = formatDate();

  const progress: UserProgress = {
    userId,
    startedAt: now,
    lastActiveAt: now,
    tutorials: [],
    stats: { ...defaultStats },
    preferences: { ...defaultPreferences },
  };

  saveUserProgress(progress);
  return progress;
}

/**
 * Get user progress from localStorage
 */
export function getUserProgress(): UserProgress | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return null;
  }
}

/**
 * Save user progress to localStorage
 */
export function saveUserProgress(progress: UserProgress): void {
  try {
    progress.lastActiveAt = formatDate();
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
}

/**
 * Get or initialize user progress
 */
export function getOrInitUserProgress(): UserProgress {
  return getUserProgress() || initUserProgress();
}

/**
 * Get tutorial progress
 */
export function getTutorialProgress(
  progress: UserProgress,
  tutorialId: string
): TutorialProgress | undefined {
  return progress.tutorials.find((t) => t.tutorialId === tutorialId);
}

/**
 * Start a tutorial
 */
export function startTutorial(progress: UserProgress, tutorialId: string): UserProgress {
  const tutorialProgress = getTutorialProgress(progress, tutorialId);

  if (!tutorialProgress) {
    // 创建新的教程进度
    const newTutorialProgress: TutorialProgress = {
      tutorialId,
      status: 'in-progress',
      currentStepId: null,
      completedStepIds: [],
      startedAt: formatDate(),
      completedAt: null,
      lastAccessedAt: formatDate(),
      simulationResults: [],
    };
    progress.tutorials.push(newTutorialProgress);
  } else if (tutorialProgress.status === 'not-started') {
    // 更新现有状态
    tutorialProgress.status = 'in-progress';
    tutorialProgress.startedAt = formatDate();
    tutorialProgress.lastAccessedAt = formatDate();
  } else {
    // 只更新访问时间
    tutorialProgress.lastAccessedAt = formatDate();
  }

  saveUserProgress(progress);
  return progress;
}

/**
 * Update tutorial progress
 */
export function updateTutorialProgress(
  progress: UserProgress,
  tutorialId: string,
  updates: Partial<TutorialProgress>
): UserProgress {
  const existingIndex = progress.tutorials.findIndex((t) => t.tutorialId === tutorialId);

  if (existingIndex >= 0) {
    progress.tutorials[existingIndex] = {
      ...progress.tutorials[existingIndex],
      ...updates,
      lastAccessedAt: formatDate(),
    };
  } else {
    const newTutorialProgress: TutorialProgress = {
      tutorialId,
      status: 'not-started',
      currentStepId: null,
      completedStepIds: [],
      startedAt: null,
      completedAt: null,
      lastAccessedAt: formatDate(),
      simulationResults: [],
      ...updates,
    };
    progress.tutorials.push(newTutorialProgress);
  }

  saveUserProgress(progress);
  return progress;
}

/**
 * Mark step as completed
 */
export function completeStep(
  progress: UserProgress,
  tutorialId: string,
  stepId: string
): UserProgress {
  const tutorialProgress = getTutorialProgress(progress, tutorialId);

  if (tutorialProgress) {
    if (!tutorialProgress.completedStepIds.includes(stepId)) {
      tutorialProgress.completedStepIds.push(stepId);
      progress.stats.totalStepsCompleted++;
    }

    tutorialProgress.status = 'in-progress';
    if (!tutorialProgress.startedAt) {
      tutorialProgress.startedAt = formatDate();
    }

    saveUserProgress(progress);
  }

  return progress;
}

/**
 * Mark tutorial as completed
 */
export function completeTutorial(progress: UserProgress, tutorialId: string): UserProgress {
  const tutorialProgress = getTutorialProgress(progress, tutorialId);

  if (tutorialProgress && tutorialProgress.status !== 'completed') {
    tutorialProgress.status = 'completed';
    tutorialProgress.completedAt = formatDate();
    progress.stats.totalTutorialsCompleted++;
    saveUserProgress(progress);
  }

  return progress;
}

/**
 * Record simulation result
 */
export function recordSimulationResult(
  progress: UserProgress,
  tutorialId: string,
  result: SimulationResult
): UserProgress {
  const tutorialProgress = getTutorialProgress(progress, tutorialId);

  if (tutorialProgress) {
    const existingIndex = tutorialProgress.simulationResults.findIndex(
      (r) => r.scenarioId === result.scenarioId
    );

    if (existingIndex >= 0) {
      tutorialProgress.simulationResults[existingIndex] = result;
    } else {
      tutorialProgress.simulationResults.push(result);
    }

    saveUserProgress(progress);
  }

  return progress;
}

/**
 * Update user preferences
 */
export function updatePreferences(
  progress: UserProgress,
  preferences: Partial<UserPreferences>
): UserProgress {
  progress.preferences = { ...progress.preferences, ...preferences };
  saveUserProgress(progress);
  return progress;
}
