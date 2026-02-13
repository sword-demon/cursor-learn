import type { CursorRuleTemplate } from '../types';

export const cursorRuleTemplates: CursorRuleTemplate[] = [
  {
    id: 'coding-style',
    category: 'coding-style',
    name: '代码风格',
    description: '定义你的代码格式偏好',
    order: 1,
    fields: [
      {
        id: 'indentation',
        label: '缩进风格',
        type: 'select',
        options: [
          { value: 'spaces-2', label: '2个空格' },
          { value: 'spaces-4', label: '4个空格' },
          { value: 'tabs', label: 'Tab' },
        ],
        required: true,
        defaultValue: 'spaces-2',
      },
      {
        id: 'semicolons',
        label: '使用分号',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        id: 'quotes',
        label: '引号风格',
        type: 'select',
        options: [
          { value: 'single', label: '单引号' },
          { value: 'double', label: '双引号' },
          { value: 'backtick', label: '模板字符串' },
        ],
        required: true,
        defaultValue: 'single',
      },
      {
        id: 'maxLineLength',
        label: '最大行长度',
        type: 'select',
        options: [
          { value: '80', label: '80字符' },
          { value: '100', label: '100字符' },
          { value: '120', label: '120字符' },
        ],
        required: true,
        defaultValue: '100',
      },
      {
        id: 'trailingComma',
        label: '尾随逗号',
        type: 'select',
        options: [
          { value: 'es5', label: 'ES5风格' },
          { value: 'all', label: '全部使用' },
          { value: 'none', label: '不使用' },
        ],
        required: true,
        defaultValue: 'es5',
      },
    ],
    template: `# Code Style Rules

## Indentation
Use {{indentation}} for indentation.

## Semicolons
{{#if semicolons}}Always use semicolons at the end of statements.{{else}}Omit semicolons when possible (ASI).{{/if}}

## Quotes
Prefer {{quotes}} quotes for strings.

## Line Length
Keep lines under {{maxLineLength}} characters.

## Trailing Commas
Use {{trailingComma}} trailing commas.`,
    examples: [
      {
        id: 'coding-style-example-1',
        title: 'JavaScript 代码风格',
        description: '典型的 JavaScript 项目代码风格配置',
        ruleContent: `# Code Style Rules
- Use 2 spaces for indentation
- Always use semicolons
- Prefer single quotes for strings
- Keep lines under 100 characters`,
        beforeExample: `function example() {
    return "hello world"
}`,
        afterExample: `function example() {
  return 'hello world';
}`,
      },
    ],
  },
  {
    id: 'framework',
    category: 'framework',
    name: '框架偏好',
    description: '指定项目使用的框架和库',
    order: 2,
    fields: [
      {
        id: 'frontend',
        label: '前端框架',
        type: 'select',
        options: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vanilla', label: 'Vanilla JS' },
        ],
        required: true,
        defaultValue: 'react',
      },
      {
        id: 'styling',
        label: 'CSS方案',
        type: 'select',
        options: [
          { value: 'tailwind', label: 'Tailwind CSS' },
          { value: 'css-modules', label: 'CSS Modules' },
          { value: 'styled-components', label: 'Styled Components' },
          { value: 'scss', label: 'SCSS' },
          { value: 'css', label: 'Plain CSS' },
        ],
        required: true,
        defaultValue: 'tailwind',
      },
      {
        id: 'stateManagement',
        label: '状态管理',
        type: 'select',
        options: [
          { value: 'redux', label: 'Redux' },
          { value: 'zustand', label: 'Zustand' },
          { value: 'context', label: 'React Context' },
          { value: 'pinia', label: 'Pinia' },
          { value: 'vuex', label: 'Vuex' },
          { value: 'none', label: '不使用' },
        ],
        required: true,
        defaultValue: 'context',
      },
      {
        id: 'language',
        label: '主要语言',
        type: 'select',
        options: [
          { value: 'typescript', label: 'TypeScript' },
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'go', label: 'Go' },
          { value: 'rust', label: 'Rust' },
        ],
        required: true,
        defaultValue: 'typescript',
      },
    ],
    template: `# Framework & Tech Stack

## Frontend Framework
Primary framework: {{frontend}}

## Styling Solution
Use {{styling}} for styling components.

## State Management
{{#if stateManagement}}
{{#if (eq stateManagement "none")}}No global state management - use local state only.{{else}}Use {{stateManagement}} for state management.{{/if}}
{{/if}}

## Primary Language
Main development language: {{language}}`,
    examples: [
      {
        id: 'framework-example-1',
        title: 'React + TypeScript 项目',
        description: '使用 React 和 TypeScript 的现代前端项目',
        ruleContent: `# Framework & Tech Stack
- Primary framework: React
- Use Tailwind CSS for styling
- Use React Context for state management
- Main development language: TypeScript`,
        beforeExample: `const UserProfile = (props) => {
  return <div className="user">{props.name}</div>;
};`,
        afterExample: `interface UserProfileProps {
  name: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name }) => {
  return <div className="p-4 bg-gray-100">{name}</div>;
};`,
      },
    ],
  },
  {
    id: 'communication',
    category: 'communication',
    name: '沟通风格',
    description: '定义 AI 的回复风格',
    order: 3,
    fields: [
      {
        id: 'tone',
        label: '沟通语气',
        type: 'select',
        options: [
          { value: 'professional', label: '专业正式' },
          { value: 'casual', label: '轻松随意' },
          { value: 'concise', label: '简洁明了' },
          { value: 'detailed', label: '详细解释' },
        ],
        required: true,
        defaultValue: 'professional',
      },
      {
        id: 'comments',
        label: '代码注释',
        type: 'select',
        options: [
          { value: 'minimal', label: '最小化' },
          { value: 'moderate', label: '适度' },
          { value: 'extensive', label: '详细' },
        ],
        required: true,
        defaultValue: 'moderate',
      },
      {
        id: 'explainReasoning',
        label: '解释推理过程',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        id: 'suggestAlternatives',
        label: '提供替代方案',
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
      {
        id: 'includeExamples',
        label: '包含使用示例',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
    ],
    template: `# Communication Style

## Tone
Adopt a {{tone}} tone when communicating.

## Code Comments
{{#if (eq comments "minimal")}}Add minimal comments - only for complex logic.{{/if}}
{{#if (eq comments "moderate")}}Add comments for public APIs and complex logic.{{/if}}
{{#if (eq comments "extensive")}}Add extensive comments explaining the "why" not just the "what".{{/if}}

## Explanations
{{#if explainReasoning}}Explain the reasoning behind suggestions and decisions.{{else}}Focus on solutions without lengthy explanations.{{/if}}

## Alternatives
{{#if suggestAlternatives}}When relevant, provide alternative approaches with pros and cons.{{else}}Provide the best solution directly.{{/if}}

## Examples
{{#if includeExamples}}Include practical usage examples when explaining concepts.{{else}}Keep explanations concise without examples unless specifically requested.{{/if}}`,
    examples: [
      {
        id: 'communication-example-1',
        title: '专业详细风格',
        description: '适合需要详细解释和学习的目的',
        ruleContent: `# Communication Style
- Adopt a detailed tone when communicating
- Add extensive comments explaining the "why"
- Explain the reasoning behind suggestions
- Include practical usage examples`,
      },
    ],
  },
  {
    id: 'custom',
    category: 'custom',
    name: '自定义规则',
    description: '完全自定义的 .cursorrules 配置',
    order: 4,
    fields: [
      {
        id: 'customRules',
        label: '自定义规则内容',
        type: 'textarea',
        placeholder: '在此输入你的自定义规则...\n例如:\n- 使用特定的设计模式\n- 遵循团队的代码审查规范\n- 特定的命名约定',
        required: true,
        defaultValue: '',
      },
    ],
    template: `# Custom Rules

{{customRules}}

## General Guidelines
- Write clean, readable code
- Follow existing project conventions
- Consider performance implications`,
    examples: [
      {
        id: 'custom-example-1',
        title: '团队规范示例',
        description: '包含团队特定的代码审查规范',
        ruleContent: `# Custom Rules
- All functions must have JSDoc comments
- No console.log in production code
- Use dependency injection for testability
- Maximum 20 lines per function`,
      },
    ],
  },
];

export function getAllTemplates(): CursorRuleTemplate[] {
  return cursorRuleTemplates.sort((a, b) => a.order - b.order);
}

export function getTemplateById(id: string): CursorRuleTemplate | undefined {
  return cursorRuleTemplates.find((t) => t.id === id);
}

export function getDefaultTemplate(): CursorRuleTemplate {
  return cursorRuleTemplates[0];
}
