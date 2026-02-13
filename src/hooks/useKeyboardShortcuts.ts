import { useEffect, useCallback, useRef } from 'react';

export type ShortcutType = 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention' | 'escape' | 'enter';

interface ShortcutConfig {
  type: ShortcutType;
  handler: () => void;
  enabled?: boolean;
}

/**
 * 检测操作系统
 */
export function detectOS(): 'windows' | 'macos' | 'linux' {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('mac') || userAgent.includes('darwin')) {
    return 'macos';
  } else if (userAgent.includes('linux')) {
    return 'linux';
  }
  return 'windows';
}

/**
 * 获取快捷键显示文本
 */
export function getShortcutDisplay(type: ShortcutType): string {
  const os = detectOS();
  const isMac = os === 'macos';

  const displays: Record<ShortcutType, { windows: string; mac: string }> = {
    'tab': { windows: 'Tab', mac: 'Tab' },
    'ctrl-k': { windows: 'Ctrl+K', mac: 'Cmd+K' },
    'ctrl-l': { windows: 'Ctrl+L', mac: 'Cmd+L' },
    'at-mention': { windows: '@', mac: '@' },
    'escape': { windows: 'Esc', mac: 'Esc' },
    'enter': { windows: 'Enter', mac: 'Enter' },
  };

  return isMac ? displays[type].mac : displays[type].windows;
}

/**
 * 键盘快捷键 Hook
 */
export function useKeyboardShortcuts(
  shortcuts: ShortcutConfig[]
) {
  // 使用 ref 存储 handler，避免重复绑定
  const handlersRef = useRef(shortcuts);

  useEffect(() => {
    handlersRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key, ctrlKey, metaKey, altKey, shiftKey } = event;

    handlersRef.current.forEach(({ type, handler, enabled = true }) => {
      if (!enabled) return;

      let matches = false;

      switch (type) {
        case 'tab':
          matches = key === 'Tab' && !ctrlKey && !metaKey && !altKey;
          break;
        case 'ctrl-k':
          matches = key.toLowerCase() === 'k' && (ctrlKey || metaKey) && !altKey;
          break;
        case 'ctrl-l':
          matches = key.toLowerCase() === 'l' && (ctrlKey || metaKey) && !altKey;
          break;
        case 'at-mention':
          matches = key === '@' && !ctrlKey && !metaKey;
          break;
        case 'escape':
          matches = key === 'Escape';
          break;
        case 'enter':
          matches = key === 'Enter' && !shiftKey;
          break;
      }

      if (matches) {
        event.preventDefault();
        handler();
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * 简单的单个快捷键监听
 */
export function useShortcut(
  type: ShortcutType,
  handler: () => void,
  enabled: boolean = true
) {
  useKeyboardShortcuts(
    [{ type, handler, enabled }]
  );
}

/**
 * 获取所有支持的快捷键列表
 */
export function getAllShortcuts(): { type: ShortcutType; name: string; description: string }[] {
  return [
    { type: 'tab', name: 'Tab', description: '接受 AI 自动补全建议' },
    { type: 'ctrl-k', name: 'Ctrl+K', description: '打开 AI 内联编辑' },
    { type: 'ctrl-l', name: 'Ctrl+L', description: '打开 AI 聊天面板' },
    { type: 'at-mention', name: '@', description: '引用文件或代码' },
    { type: 'escape', name: 'Esc', description: '取消/关闭' },
    { type: 'enter', name: 'Enter', description: '确认/提交' },
  ];
}
