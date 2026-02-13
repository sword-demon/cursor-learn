import type { AgentExample } from '../../types';

// US7: 使用 Agent 教程 - 模糊 vs 精确 prompt 对比
export const agentExamples: AgentExample[] = [
  // 模糊 prompt 示例
  {
    id: 'vague-settings-page',
    prompt: 'Add a user settings page',
    response: `I'll add a user settings page. Let me create the component...

\`\`\`tsx
// src/pages/Settings.tsx
export function Settings() {
  return <div>Settings</div>;
}
\`\`\`

I've created a basic settings page. What settings would you like to include?`,
    type: 'vague',
    tutorialId: 'agent-working',
  },
  {
    id: 'vague-fix-bug',
    prompt: 'Fix the bug',
    response: `I'd be happy to help fix the bug, but I need more information:

1. What is the expected behavior?
2. What is the actual behavior?
3. Can you share the error message or steps to reproduce?

Please provide more details so I can help effectively.`,
    type: 'vague',
    tutorialId: 'agent-working',
  },
  // 精确 prompt 示例
  {
    id: 'constrained-settings-page',
    prompt: `Create a user settings page at src/pages/Settings.tsx with:
- Dark mode toggle (use existing ThemeContext)
- Font size slider (14-24px, save to localStorage key "editor-font-size")
- Language selector (English/Chinese)
- Use the existing Card and Button components from src/components/common/
- Follow the same layout pattern as src/pages/Profile.tsx`,
    response: `I'll create the settings page following the existing patterns. Let me first check the referenced files...

\`\`\`tsx
// src/pages/Settings.tsx
import { useState } from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useTheme } from '../contexts/ThemeContext';

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(
    () => Number(localStorage.getItem('editor-font-size')) || 14
  );
  // ... complete implementation
}
\`\`\`

The settings page is ready with all three features, following the Profile page layout pattern.`,
    type: 'constrained',
    tutorialId: 'agent-working',
    fileRefs: ['src/pages/Profile.tsx', 'src/components/common/Card.tsx'],
  },
  {
    id: 'constrained-fix-bug',
    prompt: `Fix the login form bug in src/components/LoginForm.tsx:
- When user submits empty email, the app crashes with "Cannot read property 'trim' of undefined"
- The email field is optional but the handleSubmit function at line 42 calls email.trim() without null check
- Add a guard: if (!email) return early with validation error`,
    response: `Found the issue at line 42. The \`email\` variable can be \`undefined\` when the field is empty, but \`trim()\` is called directly on it.

\`\`\`tsx
// src/components/LoginForm.tsx - line 42
const handleSubmit = () => {
  if (!email) {
    setError('请输入邮箱地址');
    return;
  }
  const trimmedEmail = email.trim();
  // ... rest of the logic
};
\`\`\`

Added null check before calling \`trim()\`. The form now shows a validation error instead of crashing.`,
    type: 'constrained',
    tutorialId: 'agent-working',
    fileRefs: ['src/components/LoginForm.tsx'],
  },
  // US8: 理解代码库 - 代码库搜索场景
  {
    id: 'vague-codebase-search',
    prompt: 'Explain this codebase to me',
    response: `This is a large codebase. Could you be more specific about what part you'd like me to explain?

I can see there are many files and directories. What area are you interested in?`,
    type: 'vague',
    tutorialId: 'agent-codebase',
  },
  {
    id: 'constrained-codebase-search',
    prompt: `Explain the authentication flow in this project:
- Start from src/pages/Login.tsx (the entry point)
- Trace through src/services/auth-service.ts (API calls)
- Show how tokens are stored in src/contexts/AuthContext.tsx
- Include the route guard logic in src/components/ProtectedRoute.tsx`,
    response: `I'll trace the authentication flow through the files you specified.

**1. Login Page (src/pages/Login.tsx)**

The login form collects email and password, then calls \`authService.login()\`:

\`\`\`tsx
const handleSubmit = async (data: LoginForm) => {
  const result = await authService.login(data.email, data.password);
  if (result.success) {
    setAuth(result.token, result.user);
    navigate('/dashboard');
  }
};
\`\`\`

**2. Auth Service (src/services/auth-service.ts)**

Makes the API call and returns the token:

\`\`\`typescript
export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return response.json(); // { success, token, user }
}
\`\`\`

**3. Auth Context (src/contexts/AuthContext.tsx)**

Stores the token in localStorage and provides auth state:

\`\`\`tsx
function setAuth(token: string, user: User) {
  localStorage.setItem('auth-token', token);
  setState({ isAuthenticated: true, user, token });
}
\`\`\`

**4. Route Guard (src/components/ProtectedRoute.tsx)**

Checks auth state before rendering protected pages:

\`\`\`tsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}
\`\`\`

The flow is: Login form → API call → Store token → Redirect to dashboard. Protected routes check the auth context before rendering.`,
    type: 'constrained',
    tutorialId: 'agent-codebase',
    fileRefs: [
      'src/pages/Login.tsx',
      'src/services/auth-service.ts',
      'src/contexts/AuthContext.tsx',
      'src/components/ProtectedRoute.tsx',
    ],
  },
  // US9: 快速构建功能 - 功能构建 + TDD 场景
  {
    id: 'vague-build-feature',
    prompt: 'Add a shopping cart to the app',
    response: `I'll add a shopping cart feature. Let me create the component...

\`\`\`tsx
// src/components/ShoppingCart.tsx
export function ShoppingCart() {
  return <div>Shopping Cart</div>;
}
\`\`\`

I've created a basic shopping cart component. What functionality do you need?`,
    type: 'vague',
    tutorialId: 'agent-features',
  },
  {
    id: 'constrained-build-feature',
    prompt: `Add a shopping cart feature with the following requirements:

Phase 1 - Data model:
- Create CartItem type in src/types/cart.ts: { productId, name, price, quantity }
- Create CartContext in src/contexts/CartContext.tsx using existing pattern from AuthContext

Phase 2 - Core logic:
- addItem(item): add or increment quantity
- removeItem(productId): remove item
- updateQuantity(productId, qty): update quantity
- getTotal(): calculate total price
- Persist to localStorage key "app:cart"

Phase 3 - UI:
- CartIcon component showing item count badge (follow Header.tsx pattern)
- CartDrawer slide-out panel (reference existing Sidebar.tsx for animation)

Start with Phase 1 only. I'll review before moving to Phase 2.`,
    response: `Starting with Phase 1 - Data model. Let me check the existing patterns first...

**CartItem Type (src/types/cart.ts)**

\`\`\`typescript
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  lastUpdated: string;
}
\`\`\`

**CartContext (src/contexts/CartContext.tsx)**

\`\`\`tsx
// Following the same pattern as AuthContext
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('app:cart', []);
  // ... context implementation
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
\`\`\`

Phase 1 complete. The type and context follow existing project patterns. Ready for your review before Phase 2.`,
    type: 'constrained',
    tutorialId: 'agent-features',
    fileRefs: ['src/contexts/AuthContext.tsx', 'src/types/cart.ts'],
  },
  {
    id: 'constrained-tdd-feature',
    prompt: `Implement a password strength validator using TDD approach:

1. First write tests in src/utils/__tests__/password-validator.test.ts:
   - "weak" for < 8 chars
   - "medium" for 8+ chars with letters + numbers
   - "strong" for 8+ chars with letters + numbers + special chars
   - Edge cases: empty string, unicode characters

2. Then implement src/utils/password-validator.ts to pass all tests

3. Use the same test patterns as src/utils/__tests__/helpers.test.ts`,
    response: `Starting with tests first (TDD approach).

**Tests (src/utils/__tests__/password-validator.test.ts)**

\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { getPasswordStrength } from '../password-validator';

describe('getPasswordStrength', () => {
  it('returns "weak" for passwords shorter than 8 characters', () => {
    expect(getPasswordStrength('abc')).toBe('weak');
    expect(getPasswordStrength('1234567')).toBe('weak');
  });

  it('returns "medium" for 8+ chars with letters and numbers', () => {
    expect(getPasswordStrength('hello123')).toBe('medium');
    expect(getPasswordStrength('password1')).toBe('medium');
  });

  it('returns "strong" for 8+ chars with letters, numbers, and special chars', () => {
    expect(getPasswordStrength('Hello123!')).toBe('strong');
    expect(getPasswordStrength('P@ssw0rd#')).toBe('strong');
  });

  it('returns "weak" for empty string', () => {
    expect(getPasswordStrength('')).toBe('weak');
  });
});
\`\`\`

**Implementation (src/utils/password-validator.ts)**

\`\`\`typescript
type PasswordStrength = 'weak' | 'medium' | 'strong';

export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length < 8) return 'weak';
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  if (hasLetters && hasNumbers && hasSpecial) return 'strong';
  if (hasLetters && hasNumbers) return 'medium';
  return 'weak';
}
\`\`\`

All 4 test cases pass. The implementation follows the same patterns as helpers.test.ts.`,
    type: 'constrained',
    tutorialId: 'agent-features',
    fileRefs: ['src/utils/__tests__/helpers.test.ts'],
  },
  // US10: 查找并修复 Bug - Bug 描述场景
  {
    id: 'vague-bug-report',
    prompt: 'My app is broken, please fix it',
    response: `I'd like to help, but I need more information about what's broken:

1. What were you doing when the issue occurred?
2. What did you expect to happen?
3. What actually happened?
4. Are there any error messages?

Please share more details so I can investigate.`,
    type: 'vague',
    tutorialId: 'agent-bugs',
  },
  {
    id: 'constrained-bug-report',
    prompt: `Fix the infinite re-render bug in src/components/Dashboard.tsx:

- Symptom: page freezes after login, browser tab becomes unresponsive
- Error in console: "Maximum update depth exceeded"
- The useEffect on line 23 calls setData() which triggers a re-render, which triggers useEffect again
- Expected: data should only be fetched once on mount
- Reproduce: login with any account, navigate to /dashboard

Please check the dependency array of the useEffect and fix the loop.`,
    response: `Found the issue. The useEffect on line 23 has \`data\` in its dependency array, but it also calls \`setData()\` inside, creating an infinite loop:

\`\`\`tsx
// Before (line 23) - BROKEN
useEffect(() => {
  fetchDashboardData().then(result => setData(result));
}, [data]); // data changes → re-run → setData → data changes → ...

// After - FIXED
useEffect(() => {
  fetchDashboardData().then(result => setData(result));
}, []); // only run on mount
\`\`\`

Removed \`data\` from the dependency array. The effect now runs only once on mount, fetches the data, and sets it without triggering a re-render loop.`,
    type: 'constrained',
    tutorialId: 'agent-bugs',
    fileRefs: ['src/components/Dashboard.tsx'],
  },
  {
    id: 'constrained-bug-error-trace',
    prompt: `Debug the TypeError in src/utils/format.ts:

- Error: "Cannot read properties of undefined (reading 'toFixed')"
- Stack trace points to formatCurrency() at line 15
- The function is called from src/pages/OrderDetail.tsx line 42
- Input: order.discount which can be null when no discount applied
- Expected: show "$0.00" when discount is null/undefined

@src/utils/format.ts @src/pages/OrderDetail.tsx`,
    response: `The issue is in \`formatCurrency()\` - it doesn't handle null/undefined input:

\`\`\`typescript
// src/utils/format.ts - line 15
// Before - BROKEN
export function formatCurrency(amount: number): string {
  return '$' + amount.toFixed(2); // crashes when amount is undefined
}

// After - FIXED
export function formatCurrency(amount: number | null | undefined): string {
  return '$' + (amount ?? 0).toFixed(2);
}
\`\`\`

Used nullish coalescing (\`??\`) to default to 0 when amount is null or undefined. Now \`formatCurrency(null)\` returns "$0.00" as expected.`,
    type: 'constrained',
    tutorialId: 'agent-bugs',
    fileRefs: ['src/utils/format.ts', 'src/pages/OrderDetail.tsx'],
  },
  // US11: 审查和测试代码 - 代码审查场景
  {
    id: 'vague-code-review',
    prompt: 'Review my code',
    response: `I'd be happy to review your code. Could you share which files you'd like me to look at?

Also, what aspects are you most concerned about - functionality, performance, security, or code style?`,
    type: 'vague',
    tutorialId: 'agent-review',
  },
  {
    id: 'constrained-code-review',
    prompt: `Review src/services/auth-service.ts for security issues:

Focus areas:
- Token storage and handling (lines 15-30)
- Password validation logic (lines 45-60)
- API request headers (lines 70-85)

Check against OWASP top 10 and suggest fixes for any vulnerabilities found.
@src/services/auth-service.ts @src/types/auth.ts`,
    response: `Found 3 security issues in auth-service.ts:

**1. Token stored in localStorage (line 18) - HIGH**

\`\`\`typescript
// Before - VULNERABLE to XSS
localStorage.setItem('auth-token', token);

// After - Use httpOnly cookie instead
// Set via server response header:
// Set-Cookie: auth-token=xxx; HttpOnly; Secure; SameSite=Strict
\`\`\`

**2. Weak password validation (line 48) - MEDIUM**

\`\`\`typescript
// Before - only checks length
const isValid = password.length >= 6;

// After - enforce complexity
const isValid = password.length >= 8
  && /[A-Z]/.test(password)
  && /[0-9]/.test(password)
  && /[^a-zA-Z0-9]/.test(password);
\`\`\`

**3. Missing rate limiting header (line 72) - MEDIUM**

The login endpoint doesn't include any client-side throttling. Consider adding request debouncing and displaying remaining attempts from server response headers.

All 3 issues have fixes ready. Should I apply them?`,
    type: 'constrained',
    tutorialId: 'agent-review',
    fileRefs: ['src/services/auth-service.ts', 'src/types/auth.ts'],
  },
  {
    id: 'constrained-write-tests',
    prompt: `Write unit tests for src/utils/cart-calculator.ts:

Functions to test:
- calculateSubtotal(items): sum of price * quantity
- applyDiscount(subtotal, code): apply percentage or fixed discount
- calculateTax(amount, region): tax rates vary by region

Test requirements:
- Cover edge cases: empty cart, invalid discount code, unknown region
- Use the same test patterns as src/utils/__tests__/format.test.ts
- Mock the discount API call in applyDiscount

@src/utils/cart-calculator.ts @src/utils/__tests__/format.test.ts`,
    response: `Created comprehensive tests following the existing patterns:

\`\`\`typescript
// src/utils/__tests__/cart-calculator.test.ts
import { describe, it, expect, vi } from 'vitest';
import { calculateSubtotal, applyDiscount, calculateTax } from '../cart-calculator';

describe('calculateSubtotal', () => {
  it('sums price * quantity for all items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateSubtotal(items)).toBe(35);
  });

  it('returns 0 for empty cart', () => {
    expect(calculateSubtotal([])).toBe(0);
  });
});

describe('applyDiscount', () => {
  it('applies percentage discount', async () => {
    const result = await applyDiscount(100, 'SAVE20');
    expect(result).toBe(80);
  });

  it('returns original amount for invalid code', async () => {
    const result = await applyDiscount(100, 'INVALID');
    expect(result).toBe(100);
  });
});
\`\`\`

All 6 test cases pass, covering normal flows and edge cases.`,
    type: 'constrained',
    tutorialId: 'agent-review',
    fileRefs: ['src/utils/cart-calculator.ts', 'src/utils/__tests__/format.test.ts'],
  },
  // US12: 自定义代理 - Rules/MCP 场景
  {
    id: 'vague-customize-agent',
    prompt: 'Make the AI work better for my project',
    response: `I can help improve the AI experience. Could you tell me more about what's not working well?

Are you looking to change the coding style, add specific tools, or something else?`,
    type: 'vague',
    tutorialId: 'agent-customize',
  },
  {
    id: 'constrained-cursor-rules',
    prompt: `Create a .cursor/rules/react-conventions.mdc file for our React project:

Project context:
- React 19 + TypeScript + Tailwind CSS 4
- State management: Context API + hooks (no Redux)
- Testing: Vitest + React Testing Library
- Component pattern: function components only, no class components

Rules to enforce:
- Always use named exports (no default exports)
- Use "interface" for props, not "type"
- CSS: Tailwind utility classes only, no inline styles
- File naming: PascalCase for components, camelCase for hooks/utils
- Always add aria-label to interactive elements

Reference @src/components/common/Button.tsx for our component pattern`,
    response: `I'll create the rules file following your project conventions.

\`\`\`markdown
---
description: React component conventions for this project
globs: src/**/*.tsx, src/**/*.ts
---

## Component Rules
- Use function components with named exports
- Define props with \`interface\`, not \`type\`
- Follow PascalCase for component files, camelCase for hooks/utils

## Styling
- Use Tailwind CSS utility classes exclusively
- No inline styles or CSS modules
- Follow existing patterns in src/components/common/

## Accessibility
- Add aria-label to all interactive elements (buttons, links, inputs)
- Use semantic HTML elements

## State Management
- Use Context API + hooks for state
- No Redux or external state libraries

## Testing
- Write tests with Vitest + React Testing Library
- Test behavior, not implementation details
\`\`\`

The rules file is created at \`.cursor/rules/react-conventions.mdc\`. Cursor will automatically apply these rules when working with matching files.`,
    type: 'constrained',
    tutorialId: 'agent-customize',
    fileRefs: ['src/components/common/Button.tsx'],
  },
  {
    id: 'constrained-mcp-setup',
    prompt: `Set up MCP tools for our project. We need:

1. A database query tool that connects to our PostgreSQL dev database
2. A documentation search tool that indexes our internal wiki

Create the .cursor/mcp.json configuration file.
The PostgreSQL connection string is in the DATABASE_URL env variable.
The wiki API endpoint is https://wiki.internal.example.com/api`,
    response: `I'll create the MCP configuration for both tools.

\`\`\`json
// .cursor/mcp.json
{
  "mcpServers": {
    "postgres-dev": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "\${DATABASE_URL}"
      }
    },
    "internal-wiki": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "env": {
        "ALLOWED_URLS": "https://wiki.internal.example.com/*"
      }
    }
  }
}
\`\`\`

After saving, restart Cursor. You can verify the tools are loaded in Settings > MCP. The Agent will now be able to query the dev database and search the wiki directly.`,
    type: 'constrained',
    tutorialId: 'agent-customize',
    fileRefs: ['.cursor/mcp.json'],
  },
  // US13: 综合运用 - 完整工作流场景
  {
    id: 'vague-full-workflow',
    prompt: 'Build me a todo app',
    response: `Sure, I can help build a todo app. What features do you need?

Should it have categories, due dates, or just basic add/remove functionality?`,
    type: 'vague',
    tutorialId: 'agent-together',
  },
  {
    id: 'constrained-full-workflow',
    prompt: `Build a task management feature for our existing React app. Here's my plan:

Phase 1 - Setup:
- Create TaskItem type in src/types/task.ts: { id, title, status, priority, dueDate }
- Create TaskContext following the pattern in @src/contexts/ProgressContext.tsx

Phase 2 - Core logic:
- CRUD operations with localStorage persistence
- Filter by status (todo/in-progress/done) and priority (low/medium/high)
- Sort by dueDate or priority

Phase 3 - UI:
- TaskBoard component with three columns (Kanban style)
- Follow the Card component pattern from @src/components/common/Card.tsx
- Use Framer Motion for drag-and-drop animations

Phase 4 - Testing:
- Unit tests for TaskContext using patterns from existing tests
- Test filter and sort logic edge cases

Start with Phase 1 only. I'll review before each phase.

Rules: Follow .cursor/rules/react-conventions.mdc
@src/contexts/ProgressContext.tsx @src/components/common/Card.tsx`,
    response: `Starting with Phase 1 - Setup. I've reviewed the referenced files for patterns.

**TaskItem Type (src/types/task.ts)**

\`\`\`typescript
export interface TaskItem {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  createdAt: string;
}
\`\`\`

**TaskContext (src/contexts/TaskContext.tsx)**

\`\`\`tsx
// Following ProgressContext pattern: Context + Provider + hook
const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<TaskItem[]>('app:tasks', []);
  // CRUD operations...
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within TaskProvider');
  return context;
}
\`\`\`

Phase 1 complete. Types and context follow existing project patterns. Ready for your review.`,
    type: 'constrained',
    tutorialId: 'agent-together',
    fileRefs: ['src/contexts/ProgressContext.tsx', 'src/components/common/Card.tsx'],
  },
  // 上下文管理示例
  {
    id: 'constrained-context-management',
    prompt: `Refactor the API client in src/services/api.ts:
- Current: each function creates its own fetch call with duplicated headers
- Target: extract a shared fetchWithAuth() helper
- Keep the existing function signatures unchanged
- Reference @src/types/api.ts for response types`,
    response: `I'll extract the shared fetch logic while keeping the public API unchanged.

\`\`\`typescript
// src/services/api.ts
async function fetchWithAuth<T>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('auth-token');
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`,
      ...options?.headers,
    },
  });
  if (!response.ok) throw new ApiError(response.status);
  return response.json();
}

// Existing functions now use the shared helper
export async function getUser(id: string): Promise<User> {
  return fetchWithAuth(\`/api/users/\${id}\`);
}
\`\`\`

Refactored 5 functions to use the shared helper. All function signatures remain unchanged.`,
    type: 'constrained',
    tutorialId: 'agent-working',
    fileRefs: ['src/services/api.ts', 'src/types/api.ts'],
  },
];

// 按教程 ID 获取示例
export function getExamplesByTutorialId(tutorialId: string): AgentExample[] {
  return agentExamples.filter((e) => e.tutorialId === tutorialId);
}

// 按类型获取示例
export function getExamplesByType(type: 'vague' | 'constrained'): AgentExample[] {
  return agentExamples.filter((e) => e.type === type);
}
