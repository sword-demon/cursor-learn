# AGENTS.md - 智能编码指南

本文档为在此代码库中工作的 AI 智能体提供开发指导。

---

## 构建命令

```powershell
# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 运行代码检查 (ESLint)
npm run lint

# 预览生产构建
npm run preview

# 运行测试 (Vitest - 需要手动配置)
# npx vitest run
```

---

## 项目概览

- **类型**: React 19 + TypeScript 单页应用
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 4
- **路由**: React Router DOM 7
- **测试**: Vitest + React Testing Library (已安装但未配置)
- **目标平台**: 桌面端优先 (最小视口 768px)

---

## 代码风格指南

### 导入与路径别名

使用 `vite.config.ts` 中定义的路径别名:

```typescript
// 不要使用相对路径:
import { Button } from '../../components/common/Button';

// 使用别名:
import { Button } from '@components/common/Button';
import { useTutorial } from '@hooks/useTutorial';
import type { Tutorial } from '@types/tutorial';
import { getTutorialById } from '@services/tutorial-service';
import { tutorials } from '@data/tutorials';
import { formatDate } from '@utils/helpers';
```

可用别名:
- `@` → `./src`
- `@components` → `./src/components`
- `@hooks` → `./src/hooks`
- `@types` → `./src/types`
- `@data` → `./src/data`
- `@utils` → `./src/utils`
- `@services` → `./src/services`

### 组件模式

使用命名导出和函数组件:

```typescript
// 推荐 - 命名导出
export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// 推荐 - 使用 interface 定义 props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}
```

### 命名规范

- 组件: PascalCase (`Button`, `TutorialContext`)
- Hooks: camelCase 并以 `use` 开头 (`useTutorial`, `useLocalStorage`)
- 类型/接口: PascalCase (`Tutorial`, `UserProgress`)
- 文件: 组件使用 PascalCase (`Button.tsx`), 工具函数使用 camelCase (`helpers.ts`)

### TypeScript 规则

- 始终为 props 和函数返回值定义显式类型
- 简单类型使用 `type`, 对象形状使用 `interface`
- 优先使用 `import type { ... }` 进行类型导入
- 禁止使用 `any` - 类型未知时使用 `unknown`

### Tailwind CSS

本项目使用 Tailwind CSS 4 和自定义主题变量:

```typescript
// 使用主题颜色 (不要硬编码值)
className="bg-primary text-white"      // #C41E3A
className="bg-accent text-gray-900"    // #FFD700

// 或在自定义样式中直接使用 CSS 变量
className="bg-[#C41E3A]"
```

`src/index.css` 中定义的主题颜色:
- 主色: `#C41E3A` (中国红)
- 主色深: `#A01830`
- 强调色: `#FFD700` (金色)

---

## 错误处理

### 错误边界

使用 Error Boundaries 捕获组件级错误:

```typescript
export class EditorErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}
```

### Try/Catch 模式

始终显式处理错误:

```typescript
try {
  const result = riskyOperation();
  // 处理结果
} catch (err) {
  // 正确: 具体错误处理
  const message = err instanceof Error ? err.message : 'Unknown error';
  setError(message);
}
```

禁止使用空 catch 块。

---

## 状态管理

- 全局状态使用 React Context (参见 `contexts/`)
- 组件局部状态使用 `useState`
- 性能优化使用 `useCallback` 和 `useMemo`
- 自定义 hooks 以 `use` 开头

Context 模式示例:

```typescript
interface TutorialContextValue {
  currentTutorial: Tutorial | null;
  loadTutorial: (id: string) => void;
}

const TutorialContext = createContext<TutorialContextValue | undefined>(undefined);

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({ ... }), [...]);
  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider');
  }
  return context;
}
```

---

## 路由

路由在 `src/App.tsx` 中定义，使用懒加载:

```typescript
const HomePage = lazy(() =>
  import('./pages/Home/HomePage').then(m => ({ default: m.HomePage }))
);

// 路由使用 react-router-dom
<Route path="/commands/:commandId" element={<CommandTutorial />} />
```

---

## 测试 (尚未配置)

Vitest 和 React Testing Library 已安装，但需要配置和编写测试。添加测试时:

- 测试文件: `*.test.ts` 或 `*.test.tsx`，与源文件同级或放在 `tests/` 目录
- 使用 `@testing-library/react` 进行组件测试
- 使用 Vitest 的 `describe`, `it`, `expect` 全局函数

---

## 代码检查

`eslint.config.js` 中的 ESLint 配置:
- `@eslint/js` - 推荐规则
- `typescript-eslint` - TypeScript 支持
- `eslint-plugin-react-hooks` - React Hooks 规则
- `eslint-plugin-react-refresh` - 热更新安全

运行 `npm run lint` 检查代码。

---

## Windows 开发

本项目使用 PowerShell 兼容命令:
- 使用 `npm` 脚本而非 shell 命令
- 文件操作使用 Node.js 的 `fs` API
- 禁止使用 Linux 命令 (rm, cp, mv, cat, ls 等)

---

## 关键文件

| 路径 | 用途 |
|------|------|
| `src/App.tsx` | 主应用，包含路由配置 |
| `src/main.tsx` | 入口点 |
| `src/index.css` | Tailwind 主题 |
| `src/contexts/` | React Context 提供者 |
| `src/components/common/` | 可复用 UI 组件 |
| `src/pages/` | 路由页面组件 |

---

## 决策框架

实现功能时，优先考虑:
1. 与现有模式保持一致
2. 简单、可读的代码
3. 可测试性
4. 可逆性 (便于后续修改)

避免:
- 过早抽象
- 过度工程
- 引入不必要的依赖

---

*本文档为智能编码辅助生成*
