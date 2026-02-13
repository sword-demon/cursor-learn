import type { SimulationScenario, SimulationStep, SimulationResult } from '../types';
import { tabScenarios, getTabScenarioById } from '../data/scenarios/tab-scenarios';
import { ctrlKScenarios, getCtrlKScenarioById } from '../data/scenarios/ctrl-k-scenarios';
import { ctrlLScenarios, getCtrlLScenarioById } from '../data/scenarios/ctrl-l-scenarios';
import { atScenarios, getAtScenarioById } from '../data/scenarios/at-scenarios';
import { projectScenarios, getProjectScenarioById } from '../data/scenarios/project-scenarios';

// 所有场景的集合
const allScenarios: SimulationScenario[] = [
  ...tabScenarios,
  ...ctrlKScenarios,
  ...ctrlLScenarios,
  ...atScenarios,
  ...projectScenarios,
];

/**
 * 获取所有模拟场景
 */
export function getAllScenarios(): SimulationScenario[] {
  return allScenarios;
}

/**
 * 根据 ID 获取场景
 */
export function getScenarioById(id: string): SimulationScenario | undefined {
  // 尝试从各个分类中获取
  return (
    getTabScenarioById(id) ??
    getCtrlKScenarioById(id) ??
    getCtrlLScenarioById(id) ??
    getAtScenarioById(id) ??
    getProjectScenarioById(id)
  );
}

/**
 * 根据命令类型获取场景
 */
export function getScenariosByCommandType(
  commandType: 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention'
): SimulationScenario[] {
  return allScenarios.filter(
    (scenario) => scenario.targetCommand.type === commandType
  );
}

/**
 * 获取场景中的当前步骤
 */
export function getCurrentStep(
  scenario: SimulationScenario,
  stepOrder: number
): SimulationStep | undefined {
  return scenario.steps.find((step) => step.order === stepOrder);
}

/**
 * 验证用户操作是否匹配步骤触发条件
 */
export function validateUserAction(
  step: SimulationStep,
  actionType: string,
  actionValue: string
): boolean {
  const { trigger } = step;

  // 支持多种触发类型
  switch (trigger.type) {
    case 'keystroke':
      return actionType === 'keystroke' && actionValue === trigger.value;
    case 'command':
      return actionType === 'command' && actionValue === trigger.value;
    case 'click':
      return actionType === 'click' && actionValue === trigger.value;
    default:
      return false;
  }
}

/**
 * 检查是否有下一步
 */
export function hasNextStep(
  scenario: SimulationScenario,
  currentStepOrder: number
): boolean {
  return scenario.steps.some((step) => step.order > currentStepOrder);
}

/**
 * 获取下一步
 */
export function getNextStep(
  scenario: SimulationScenario,
  currentStepOrder: number
): SimulationStep | undefined {
  const nextSteps = scenario.steps
    .filter((step) => step.order > currentStepOrder)
    .sort((a, b) => a.order - b.order);
  return nextSteps[0];
}

/**
 * 计算模拟结果
 */
export function calculateSimulationResult(
  scenario: SimulationScenario,
  completedSteps: number[],
  hintsUsed: number,
  startTime: number
): SimulationResult {
  const endTime = Date.now();
  const timeSpent = Math.round((endTime - startTime) / 1000); // 转换为秒

  return {
    scenarioId: scenario.id,
    attempts: completedSteps.length,
    successful: completedSteps.length === scenario.steps.length,
    completedAt: new Date().toISOString(),
    timeSpent,
    hintsUsed,
  };
}

/**
 * 获取提示
 */
export function getHint(
  scenario: SimulationScenario,
  stepOrder: number,
  hintIndex: number
): string | undefined {
  // 优先返回步骤特定的提示
  const step = getCurrentStep(scenario, stepOrder);
  if (step && step.instruction) {
    return step.instruction;
  }

  // 返回场景级别的提示
  return scenario.hints[hintIndex] ?? scenario.hints[0];
}

/**
 * 获取所有可用的提示
 */
export function getAllHints(scenario: SimulationScenario): string[] {
  return scenario.hints;
}

/**
 * 搜索场景
 */
export function searchScenarios(query: string): SimulationScenario[] {
  const lowercaseQuery = query.toLowerCase();
  return allScenarios.filter(
    (scenario) =>
      scenario.title.toLowerCase().includes(lowercaseQuery) ||
      scenario.description.toLowerCase().includes(lowercaseQuery)
  );
}
