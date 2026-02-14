import type { Tutorial, TutorialSummary } from '../types';

// Import tutorial data files
import { installationTutorial } from '../data/tutorials/installation';
import { commandsTabTutorial } from '../data/tutorials/commands-tab';
import { commandsCtrlKTutorial } from '../data/tutorials/commands-ctrl-k';
import { commandsCtrlLTutorial } from '../data/tutorials/commands-ctrl-l';
import { commandsAtTutorial } from '../data/tutorials/commands-at';
import { rulesTutorial } from '../data/tutorials/rules';
import { projectTodoTutorial } from '../data/tutorials/project-todo';
import { configIgnoreTutorial } from '../data/tutorials/config-ignore';
import { configShortcutsTutorial } from '../data/tutorials/config-shortcuts';
import { agentWorkingTutorial } from '../data/tutorials/agent-working';
import { agentCodebaseTutorial } from '../data/tutorials/agent-codebase';
import { agentFeaturesTutorial } from '../data/tutorials/agent-features';
import { agentBugsTutorial } from '../data/tutorials/agent-bugs';
import { agentReviewTutorial } from '../data/tutorials/agent-review';
import { configExtensionsTutorial } from '../data/tutorials/config-extensions';
import { configThemesTutorial } from '../data/tutorials/config-themes';
import { configShellTutorial } from '../data/tutorials/config-shell';
import { configWorktreesTutorial } from '../data/tutorials/config-worktrees';
import { agentCustomizeTutorial } from '../data/tutorials/agent-customize';
import { agentTogetherTutorial } from '../data/tutorials/agent-together';
import { speckitInstallTutorial } from '../data/tutorials/speckit-install';
import { speckitWorkflowTutorial } from '../data/tutorials/speckit-workflow';
import { speckitCaseTutorial } from '../data/tutorials/speckit-case';
import { speckitAdvancedTutorial } from '../data/tutorials/speckit-advanced';
import { skillsIntroTutorial } from '../data/tutorials/skills-intro';
import { skillsInstallTutorial } from '../data/tutorials/skills-install';
import { skillsOfficialTutorial } from '../data/tutorials/skills-official';
import { skillsFrontendDesignTutorial } from '../data/tutorials/skills-frontend-design';
import { skillsCustomTutorial } from '../data/tutorials/skills-custom';

// Tutorial registry
const tutorials: Tutorial[] = [
  installationTutorial,
  commandsTabTutorial,
  commandsCtrlKTutorial,
  commandsCtrlLTutorial,
  commandsAtTutorial,
  rulesTutorial,
  projectTodoTutorial,
  configIgnoreTutorial,
  configShortcutsTutorial,
  configExtensionsTutorial,
  configThemesTutorial,
  configShellTutorial,
  configWorktreesTutorial,
  agentWorkingTutorial,
  agentCodebaseTutorial,
  agentFeaturesTutorial,
  agentBugsTutorial,
  agentReviewTutorial,
  agentCustomizeTutorial,
  agentTogetherTutorial,
  speckitInstallTutorial,
  speckitWorkflowTutorial,
  speckitCaseTutorial,
  speckitAdvancedTutorial,
  skillsIntroTutorial,
  skillsInstallTutorial,
  skillsOfficialTutorial,
  skillsFrontendDesignTutorial,
  skillsCustomTutorial,
].filter((t) => t.isPublished);

/**
 * Get all tutorials
 */
export function getAllTutorials(): Tutorial[] {
  return [...tutorials].sort((a, b) => a.order - b.order);
}

/**
 * Get tutorial summaries (without steps)
 */
export function getTutorialSummaries(): TutorialSummary[] {
  return getAllTutorials().map((tutorial) => ({
    id: tutorial.id,
    title: tutorial.title,
    description: tutorial.description,
    difficulty: tutorial.difficulty,
    estimatedTime: tutorial.estimatedTime,
    category: tutorial.category,
  }));
}

/**
 * Get tutorial by ID
 */
export function getTutorialById(id: string): Tutorial | undefined {
  return tutorials.find((t) => t.id === id);
}

/**
 * Get tutorials by category
 */
export function getTutorialsByCategory(category: string): Tutorial[] {
  return getAllTutorials().filter((t) => t.category === category);
}

/**
 * Get tutorials by difficulty
 */
export function getTutorialsByDifficulty(difficulty: string): Tutorial[] {
  return getAllTutorials().filter((t) => t.difficulty === difficulty);
}

/**
 * Get next step ID in a tutorial
 */
export function getNextStepId(tutorial: Tutorial, currentStepId: string): string | null {
  const currentIndex = tutorial.steps.findIndex((s) => s.id === currentStepId);
  if (currentIndex === -1 || currentIndex >= tutorial.steps.length - 1) {
    return null;
  }
  return tutorial.steps[currentIndex + 1].id;
}

/**
 * Get previous step ID in a tutorial
 */
export function getPreviousStepId(tutorial: Tutorial, currentStepId: string): string | null {
  const currentIndex = tutorial.steps.findIndex((s) => s.id === currentStepId);
  if (currentIndex <= 0) {
    return null;
  }
  return tutorial.steps[currentIndex - 1].id;
}

/**
 * Calculate tutorial progress percentage
 */
export function calculateProgress(tutorial: Tutorial, completedStepIds: string[]): number {
  if (tutorial.steps.length === 0) return 0;
  return Math.round((completedStepIds.length / tutorial.steps.length) * 100);
}
