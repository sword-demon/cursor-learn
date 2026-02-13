[根目录](../../CLAUDE.md) > [src](../) > **utils**

---

# Utils 模块

**职责**: 工具函数

---

## 文件结构

```
utils/
├── constants.ts     # 应用常量
├── helpers.ts       # 通用辅助函数
└── os-detection.ts  # 操作系统检测
```

---

## constants.ts

**职责**: 应用常量定义

### THEME

```typescript
const THEME = {
  colors: {
    primary: '#C41E3A',
    primaryDark: '#A01830',
    primaryLight: '#E02E4A',
    accent: '#FFD700',
    accentDark: '#D4AF37',
    accentLight: '#FFEC8B',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1280px',
  },
};
```

### STORAGE_KEYS

```typescript
const STORAGE_KEYS = {
  USER_PROGRESS: 'cursor-tutorial:progress',
  USER_PREFERENCES: 'cursor-tutorial:preferences',
  ANONYMOUS_ID: 'cursor-tutorial:anonymous-id',
};
```

### APP_INFO

```typescript
const APP_INFO = {
  NAME: 'Cursor Tutorial',
  VERSION: '1.0.0',
};
```

---

## helpers.ts

**职责**: 通用辅助函数

### generateId

生成唯一 ID

```typescript
function generateId(): string
// 返回: "1234567890123-abc123def"
```

### formatTime

格式化时间（分钟转可读字符串）

```typescript
function formatTime(minutes: number): string
// 5 -> "5分钟"
// 90 -> "1小时30分钟"
// 120 -> "2小时"
```

### debounce

防抖函数

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void
```

### formatDate

格式化日期为 ISO 字符串

```typescript
function formatDate(date?: Date): string
// 返回: "2026-02-13T06:14:55.123Z"
```

### clamp

限制数值范围

```typescript
function clamp(value: number, min: number, max: number): number
```

---

## os-detection.ts

**职责**: 操作系统检测和特定功能

### detectOS

检测用户操作系统

```typescript
function detectOS(): 'windows' | 'macos' | 'linux'
```

**实现**: 基于 `navigator.userAgent`

### getShortcutDisplay

获取 OS 特定的快捷键显示

```typescript
function getShortcutDisplay(shortcut: string, os: OSType): string
// Windows: "Ctrl+K"
// macOS: "⌘K"
```

### getCursorDownloadUrl

获取 Cursor 下载链接

```typescript
function getCursorDownloadUrl(os: OSType): string
// windows -> "https://cursor.sh/downloads/windows"
// macos -> "https://cursor.sh/downloads/mac"
// linux -> "https://cursor.sh/downloads/linux"
```

---

## 使用示例

```typescript
import { THEME, STORAGE_KEYS, APP_INFO } from '../utils/constants';
import { generateId, formatTime, debounce, clamp } from '../utils/helpers';
import { detectOS, getShortcutDisplay, getCursorDownloadUrl } from '../utils/os-detection';

// 使用常量
const primaryColor = THEME.colors.primary;
const storageKey = STORAGE_KEYS.USER_PROGRESS;

// 生成 ID
const id = generateId();

// 格式化时间
const timeStr = formatTime(90); // "1小时30分钟"

// 防抖
const debouncedSearch = debounce((query: string) => {
  // 搜索逻辑
}, 300);

// OS 检测
const os = detectOS();
const downloadUrl = getCursorDownloadUrl(os);
```

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 utils 模块文档
- 记录所有工具函数
