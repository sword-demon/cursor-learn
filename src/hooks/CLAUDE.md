[根目录](../../CLAUDE.md) > [src](../) > **hooks**

---

# Hooks 模块

**职责**: 自定义 React Hooks

---

## Hook 列表

### useLocalStorage

**文件**: `useLocalStorage.ts`

**职责**: 带序列化和错误处理的 localStorage Hook

**Signature**:
```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    onError?: (error: Error) => void;
  }
): [T, (value: T | ((prev: T) => T)) => void]
```

**Features**:
- 自动序列化/反序列化（默认 JSON）
- 跨标签页同步（监听 storage 事件）
- 错误处理

**Usage**:
```tsx
const [value, setValue] = useLocalStorage('my-key', defaultValue);
```

---

### useKeyboardShortcuts

**文件**: `useKeyboardShortcuts.ts`

**职责**: 键盘快捷键监听 Hook

**Types**:
```typescript
type ShortcutType = 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention' | 'escape' | 'enter';

interface ShortcutConfig {
  type: ShortcutType;
  handler: () => void;
  enabled?: boolean;
}
```

**Signature**:
```typescript
function useKeyboardShortcuts(shortcuts: ShortcutConfig[]): void
function useShortcut(type: ShortcutType, handler: () => void, enabled?: boolean): void
```

**Features**:
- 支持多快捷键同时监听
- 可启用/禁用特定快捷键
- 自动阻止默认行为
- 跨平台快捷键显示（Windows/Mac）

**Helper Functions**:
- `detectOS(): 'windows' | 'macos' | 'linux'` - 检测操作系统
- `getShortcutDisplay(type): string` - 获取快捷键显示文本
- `getAllShortcuts()` - 获取所有支持的快捷键列表

**Usage**:
```tsx
// 多个快捷键
useKeyboardShortcuts([
  { type: 'tab', handler: handleTab, enabled: true },
  { type: 'ctrl-k', handler: handleCtrlK, enabled: isEditing },
  { type: 'escape', handler: handleEscape, enabled: true },
]);

// 单个快捷键
useShortcut('tab', handleTab, !readOnly);
```

---

## 辅助函数

### detectOS

检测用户操作系统

```typescript
function detectOS(): 'windows' | 'macos' | 'linux'
```

### getShortcutDisplay

获取快捷键的显示文本（自动适配操作系统）

```typescript
function getShortcutDisplay(type: ShortcutType): string
// Windows: "Ctrl+K"
// macOS: "Cmd+K"
```

### getAllShortcuts

获取所有支持的快捷键列表

```typescript
function getAllShortcuts(): Array<{
  type: ShortcutType;
  name: string;
  description: string;
}>
```

---

## 快捷键映射

| ShortcutType | Windows | macOS | 描述 |
|--------------|---------|-------|------|
| tab | Tab | Tab | 接受 AI 自动补全建议 |
| ctrl-k | Ctrl+K | Cmd+K | 打开 AI 内联编辑 |
| ctrl-l | Ctrl+L | Cmd+L | 打开 AI 聊天面板 |
| at-mention | @ | @ | 引用文件或代码 |
| escape | Esc | Esc | 取消/关闭 |
| enter | Enter | Enter | 确认/提交 |

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 hooks 模块文档
- 记录 useLocalStorage 和 useKeyboardShortcuts 接口
