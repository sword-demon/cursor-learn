// User-related type definitions

export type OSType = 'windows' | 'macos' | 'linux';
export type ThemeType = 'light' | 'dark' | 'system';
export type TutorialStatus = 'not-started' | 'in-progress' | 'completed';

export interface UserProgress {
  userId: string;
  startedAt: string; // ISO date
  lastActiveAt: string; // ISO date
  tutorials: TutorialProgress[];
  stats: UserStats;
  preferences: UserPreferences;
}

export interface TutorialProgress {
  tutorialId: string;
  status: TutorialStatus;
  currentStepId: string | null;
  completedStepIds: string[];
  startedAt: string | null; // ISO date
  completedAt: string | null; // ISO date
  lastAccessedAt: string; // ISO date
  simulationResults: SimulationResult[];
}

export interface SimulationResult {
  scenarioId: string;
  attempts: number;
  successful: boolean;
  completedAt: string; // ISO date
  timeSpent: number; // Seconds
  hintsUsed: number;
}

export interface UserStats {
  totalTutorialsCompleted: number;
  totalStepsCompleted: number;
  totalTimeSpent: number; // Minutes
  favoriteCommand?: string;
}

export interface UserPreferences {
  os: OSType | null;
  theme: ThemeType;
  editorFontSize: number;
  reduceMotion: boolean;
}
