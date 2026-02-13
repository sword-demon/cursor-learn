// Simulation-related type definitions

export type CommandType = 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention';
export type ResponseType = 'code-completion' | 'inline-edit' | 'chat-message' | 'context-menu';
export type TriggerType = 'keystroke' | 'command' | 'click';

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  language: string;
  targetCommand: TargetCommand;
  steps: SimulationStep[];
  hints: string[];
}

export interface TargetCommand {
  type: CommandType;
  shortcut: string;
  description: string;
}

export interface SimulationStep {
  order: number;
  instruction: string;
  trigger: Trigger;
  response: SimulatedResponse;
  validation?: StepValidation;
}

export interface Trigger {
  type: TriggerType;
  value: string;
}

export interface SimulatedResponse {
  type: ResponseType;
  content: string;
  delay?: number; // ms
  metadata?: {
    confidence?: number;
    alternatives?: string[];
  };
}

export interface StepValidation {
  expectedInput?: string;
  expectedCodeChange?: string;
}
