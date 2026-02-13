import type { KeyboardShortcut, ShortcutCategory } from '../../types';

// 分类标签映射
export const shortcutCategoryLabels: Record<ShortcutCategory, string> = {
  general: '通用',
  chat: 'AI 对话',
  'inline-edit': '内联编辑',
  'code-selection': '代码选择',
  tab: 'Tab 补全',
  terminal: '终端',
};

// 分类显示顺序
export const shortcutCategoryOrder: ShortcutCategory[] = [
  'general',
  'chat',
  'inline-edit',
  'code-selection',
  'tab',
  'terminal',
];

export const keyboardShortcuts: KeyboardShortcut[] = [
  // === General ===
  {
    id: 'general-command-palette',
    description: '打开命令面板',
    windowsKey: 'Ctrl+Shift+P',
    macKey: 'Cmd+Shift+P',
    category: 'general',
  },
  {
    id: 'general-settings',
    description: '打开设置',
    windowsKey: 'Ctrl+,',
    macKey: 'Cmd+,',
    category: 'general',
  },
  {
    id: 'general-quick-open',
    description: '快速打开文件',
    windowsKey: 'Ctrl+P',
    macKey: 'Cmd+P',
    category: 'general',
  },
  {
    id: 'general-toggle-sidebar',
    description: '切换侧边栏',
    windowsKey: 'Ctrl+B',
    macKey: 'Cmd+B',
    category: 'general',
  },
  {
    id: 'general-toggle-terminal',
    description: '切换终端面板',
    windowsKey: 'Ctrl+`',
    macKey: 'Cmd+`',
    category: 'general',
  },
  {
    id: 'general-new-window',
    description: '新建窗口',
    windowsKey: 'Ctrl+Shift+N',
    macKey: 'Cmd+Shift+N',
    category: 'general',
  },

  // === Chat (AI 对话) ===
  {
    id: 'chat-open',
    description: '打开 AI 对话面板',
    windowsKey: 'Ctrl+L',
    macKey: 'Cmd+L',
    category: 'chat',
  },
  {
    id: 'chat-new',
    description: '新建对话',
    windowsKey: 'Ctrl+Shift+L',
    macKey: 'Cmd+Shift+L',
    category: 'chat',
  },
  {
    id: 'chat-toggle-agent',
    description: '切换 Agent 模式',
    windowsKey: 'Ctrl+.',
    macKey: 'Cmd+.',
    category: 'chat',
  },
  {
    id: 'chat-add-context',
    description: '在对话中添加上下文 (@)',
    windowsKey: '@',
    macKey: '@',
    category: 'chat',
  },
  {
    id: 'chat-submit',
    description: '发送消息',
    windowsKey: 'Enter',
    macKey: 'Enter',
    category: 'chat',
  },
  {
    id: 'chat-newline',
    description: '对话中换行',
    windowsKey: 'Shift+Enter',
    macKey: 'Shift+Enter',
    category: 'chat',
  },

  // === Inline Edit (内联编辑) ===
  {
    id: 'inline-edit-trigger',
    description: '触发内联编辑',
    windowsKey: 'Ctrl+K',
    macKey: 'Cmd+K',
    category: 'inline-edit',
  },
  {
    id: 'inline-edit-accept',
    description: '接受内联编辑建议',
    windowsKey: 'Ctrl+Shift+Y',
    macKey: 'Cmd+Shift+Y',
    category: 'inline-edit',
  },
  {
    id: 'inline-edit-reject',
    description: '拒绝内联编辑建议',
    windowsKey: 'Ctrl+Shift+N',
    macKey: 'Cmd+Shift+N',
    category: 'inline-edit',
  },
  {
    id: 'inline-edit-retry',
    description: '重新生成建议',
    windowsKey: 'Ctrl+Shift+R',
    macKey: 'Cmd+Shift+R',
    category: 'inline-edit',
  },

  // === Code Selection (代码选择) ===
  {
    id: 'selection-expand',
    description: '扩展选择范围',
    windowsKey: 'Shift+Alt+Right',
    macKey: 'Ctrl+Shift+Cmd+Right',
    category: 'code-selection',
  },
  {
    id: 'selection-shrink',
    description: '收缩选择范围',
    windowsKey: 'Shift+Alt+Left',
    macKey: 'Ctrl+Shift+Cmd+Left',
    category: 'code-selection',
  },
  {
    id: 'selection-line',
    description: '选择当前行',
    windowsKey: 'Ctrl+L',
    macKey: 'Cmd+L',
    category: 'code-selection',
  },
  {
    id: 'selection-add-cursor',
    description: '添加多光标 (上/下)',
    windowsKey: 'Ctrl+Alt+Up/Down',
    macKey: 'Cmd+Alt+Up/Down',
    category: 'code-selection',
  },
  {
    id: 'selection-all-occurrences',
    description: '选择所有匹配项',
    windowsKey: 'Ctrl+Shift+L',
    macKey: 'Cmd+Shift+L',
    category: 'code-selection',
  },

  // === Tab (Tab 补全) ===
  {
    id: 'tab-accept',
    description: '接受 Tab 补全建议',
    windowsKey: 'Tab',
    macKey: 'Tab',
    category: 'tab',
  },
  {
    id: 'tab-reject',
    description: '拒绝 Tab 补全建议',
    windowsKey: 'Escape',
    macKey: 'Escape',
    category: 'tab',
  },
  {
    id: 'tab-accept-word',
    description: '逐词接受建议',
    windowsKey: 'Ctrl+Right',
    macKey: 'Cmd+Right',
    category: 'tab',
  },
  {
    id: 'tab-next-suggestion',
    description: '查看下一个建议',
    windowsKey: 'Alt+]',
    macKey: 'Alt+]',
    category: 'tab',
  },

  // === Terminal (终端) ===
  {
    id: 'terminal-new',
    description: '新建终端',
    windowsKey: 'Ctrl+Shift+`',
    macKey: 'Cmd+Shift+`',
    category: 'terminal',
  },
  {
    id: 'terminal-split',
    description: '拆分终端',
    windowsKey: 'Ctrl+Shift+5',
    macKey: 'Cmd+Shift+5',
    category: 'terminal',
  },
  {
    id: 'terminal-kill',
    description: '关闭当前终端',
    windowsKey: 'Ctrl+Shift+W',
    macKey: 'Cmd+Shift+W',
    category: 'terminal',
  },
  {
    id: 'terminal-clear',
    description: '清空终端',
    windowsKey: 'Ctrl+K',
    macKey: 'Cmd+K',
    category: 'terminal',
  },
];

// 按分类获取快捷键
export function getShortcutsByCategory(category: ShortcutCategory): KeyboardShortcut[] {
  return keyboardShortcuts.filter((s) => s.category === category);
}
