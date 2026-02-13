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
