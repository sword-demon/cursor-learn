// Tutorial-related type definitions

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type TutorialCategory = 'installation' | 'commands' | 'rules' | 'project' | 'config' | 'agents' | 'spec-kit' | 'skills';
export type StepType = 'content' | 'simulation' | 'practice' | 'quiz' | 'comparison';
export type CompletionCriteriaType = 'view' | 'action' | 'success' | 'time';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number; // Minutes
  category: TutorialCategory;
  order: number;
  prerequisites: string[];
  steps: TutorialStep[];
  isPublished: boolean;
}

export interface TutorialStep {
  id: string;
  order: number;
  title: string;
  content: string; // Markdown content
  type: StepType;
  simulationId?: string;
  quiz?: QuizQuestion;
  nextStepId?: string;
  previousStepId?: string;
  completionCriteria: CompletionCriteria;
}

export interface CompletionCriteria {
  type: CompletionCriteriaType;
  params?: Record<string, any>;
}

export interface QuizQuestion {
  question: string;
  type: 'single' | 'multiple' | 'true-false';
  options: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface TutorialSummary {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number;
  category: TutorialCategory;
  isCompleted?: boolean;
  progress?: number;
}

// Cursor Rules Types
export type RuleFieldType = 'text' | 'textarea' | 'select' | 'multiselect' | 'boolean';
export type RuleCategory = 'coding-style' | 'framework' | 'communication' | 'custom';

export interface RuleField {
  id: string;
  label: string;
  type: RuleFieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required: boolean;
  defaultValue?: any;
}

export interface RuleExample {
  id: string;
  title: string;
  description: string;
  ruleContent: string;
  beforeExample?: string;
  afterExample?: string;
}

export interface CursorRuleTemplate {
  id: string;
  category: RuleCategory;
  name: string;
  description: string;
  fields: RuleField[];
  template: string;
  examples: RuleExample[];
  order: number;
}

// Agent 示例对话
export interface AgentExample {
  id: string;
  prompt: string;
  response: string;
  type: 'vague' | 'constrained';
  tutorialId: string;
  fileRefs?: string[];
}

// 小白提示
export interface BeginnerTip {
  id: string;
  title: string;
  content: string;
  concept: string;
  tutorialId: string;
}

// 快捷键
export type ShortcutCategory =
  | 'general' | 'chat' | 'inline-edit'
  | 'code-selection' | 'tab' | 'terminal';

export interface KeyboardShortcut {
  id: string;
  description: string;
  windowsKey: string;
  macKey: string;
  category: ShortcutCategory;
}

// 忽略模式
export interface IgnorePattern {
  pattern: string;
  description: string;
  matchExamples: string[];
  noMatchExamples: string[];
}

// Skill 相关类型
export type SkillCategory =
  | 'creative-design'
  | 'development'
  | 'communication'
  | 'document';

export interface SkillCard {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: SkillCategory;
  useCases: string[];
  exampleCommand: string;
  exampleOutput: string;
  isOfficial: boolean;
  tags: string[];
}

export interface SkillComparison {
  id: string;
  title: string;
  description: string;
  skillName: string;
  withoutSkill: {
    prompt: string;
    code: string;
    screenshotUrl: string;
  };
  withSkill: {
    prompt: string;
    code: string;
    screenshotUrl: string;
  };
  highlights: string[];
}

export interface SkillRecommendation {
  id: string;
  scenario: string;
  scenarioIcon: string;
  description: string;
  recommendedSkills: {
    skillId: string;
    reason: string;
  }[];
}
