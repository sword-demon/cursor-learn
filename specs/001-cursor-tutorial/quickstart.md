# Quick Start: Cursor Tutorial Website

**Project**: Cursor Tutorial Website
**Stack**: React + TypeScript + Vite + Tailwind CSS
**Date**: 2026-02-13

---

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or pnpm/yarn)
- **Git**: For version control
- **OS**: Windows 10+ (per Constitution)

---

## Initial Setup

### 1. Clone and Checkout Branch

```powershell
# Already on branch 001-cursor-tutorial
git checkout 001-cursor-tutorial
```

### 2. Create Project Structure

```powershell
# Create React app with Vite
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install additional dependencies
npm install react-router-dom framer-motion @monaco-editor/react
npm install -D tailwindcss postcss autoprefixer @types/node

# Initialize Tailwind
npx tailwindcss init -p
```

### 3. Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41E3A',
          dark: '#A01830',
          light: '#E02E4A',
          50: '#FDF2F4',
          100: '#FCE5E9',
          200: '#F9CDD4',
          300: '#F4A4B3',
          400: '#EC7088',
          500: '#C41E3A',
          600: '#A01830',
          700: '#85152A',
          800: '#711528',
          900: '#611727',
        },
        accent: {
          DEFAULT: '#FFD700',
          dark: '#D4AF37',
          light: '#FFEC8B',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, -apple-system, sans-serif;
  }

  code, pre {
    font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors;
  }

  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
  }
}
```

### 4. Configure TypeScript Paths

```json
// tsconfig.json
{
  "compilerOptions": {
    // ... existing options
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@data/*": ["src/data/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
})
```

### 5. Project Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Tooltip.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── tutorial/
│   │   ├── TutorialCard.tsx
│   │   ├── TutorialStep.tsx
│   │   ├── TutorialNavigation.tsx
│   │   └── TutorialProgress.tsx
│   └── simulator/
│       ├── CodeEditor.tsx
│       ├── CommandOverlay.tsx
│       ├── SimulationView.tsx
│       └── HintPanel.tsx
├── contexts/
│   ├── TutorialContext.tsx
│   └── ProgressContext.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useProgress.ts
│   ├── useTutorial.ts
│   └── useKeyboardShortcuts.ts
├── pages/
│   ├── Home/
│   │   └── HomePage.tsx
│   ├── Installation/
│   │   └── InstallationPage.tsx
│   ├── Commands/
│   │   └── CommandsPage.tsx
│   ├── RulesBuilder/
│   │   └── RulesBuilderPage.tsx
│   └── ProjectTutorial/
│       └── ProjectTutorialPage.tsx
├── services/
│   ├── progress-service.ts
│   ├── tutorial-service.ts
│   └── simulator-service.ts
├── types/
│   ├── index.ts
│   ├── tutorial.ts
│   ├── simulation.ts
│   └── user.ts
├── data/
│   ├── tutorials/
│   │   ├── installation.ts
│   │   ├── commands-tab.ts
│   │   ├── commands-ctrl-k.ts
│   │   ├── commands-ctrl-l.ts
│   │   └── rules.ts
│   └── scenarios/
│       ├── tab-scenarios.ts
│       ├── ctrl-k-scenarios.ts
│       └── ctrl-l-scenarios.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── os-detection.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Development Workflow

### Start Development Server

```powershell
npm run dev
```

### Build for Production

```powershell
npm run build
```

### Run Tests

```powershell
npm run test
```

### Lint

```powershell
npm run lint
```

---

## Key Implementation Notes

### State Management

```typescript
// contexts/ProgressContext.tsx
import { createContext, useContext, useState, useCallback } from 'react'
import type { UserProgress, TutorialProgress } from '@types/user'

interface ProgressContextType {
  progress: UserProgress | null
  updateTutorialProgress: (tutorialId: string, data: Partial<TutorialProgress>) => void
  completeStep: (tutorialId: string, stepId: string) => void
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useLocalStorage<UserProgress>('cursor-tutorial:progress', defaultProgress)

  // Implementation per data-model.md

  return (
    <ProgressContext.Provider value={{ progress, updateTutorialProgress, completeStep }}>
      {children}
    </ProgressContext.Provider>
  )
}
```

### Code Editor Integration

```typescript
// components/simulator/CodeEditor.tsx
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  initialCode: string
  language: string
  onCommand: (command: string, context: any) => void
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  onCommand
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Detect Cursor commands
    if (e.key === 'Tab') {
      onCommand('tab', { /* context */ })
    }
    if (e.key === 'k' && e.ctrlKey) {
      e.preventDefault()
      onCommand('ctrl-k', { /* context */ })
    }
    // ... other commands
  }

  return (
    <Editor
      height="400px"
      defaultLanguage={language}
      defaultValue={initialCode}
      onMount={(editor, monaco) => {
        editor.onKeyDown(handleKeyDown)
      }}
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
      }}
    />
  )
}
```

### Theme Configuration

```typescript
// utils/constants.ts
export const THEME = {
  colors: {
    primary: '#C41E3A',
    primaryDark: '#A01830',
    primaryLight: '#E02E4A',
    accent: '#FFD700',
    accentDark: '#D4AF37',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1280px',
  }
} as const

export const STORAGE_KEYS = {
  USER_PROGRESS: 'cursor-tutorial:progress',
  USER_PREFERENCES: 'cursor-tutorial:preferences',
  ANONYMOUS_ID: 'cursor-tutorial:anonymous-id',
} as const
```

---

## Deployment

### Static Hosting (Recommended)

```powershell
# Build
npm run build

# Deploy dist/ folder to:
# - GitHub Pages
# - Vercel
# - Netlify
# - Cloudflare Pages
```

### Environment Variables

```powershell
# .env.production
VITE_APP_NAME=Cursor Tutorial
VITE_APP_VERSION=1.0.0
```

---

## Troubleshooting

### Monaco Editor Not Loading

```typescript
// Use loader config
import { loader } from '@monaco-editor/react'

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
  }
})
```

### localStorage Quota

```typescript
// utils/storage.ts
export const checkStorageQuota = () => {
  const used = JSON.stringify(localStorage).length
  const limit = 5 * 1024 * 1024 // 5MB
  console.log(`Storage used: ${(used / 1024).toFixed(2)}KB / ${(limit / 1024).toFixed(2)}KB`)
}
```

---

## Next Steps

1. Run `npm run dev` to start development server
2. Implement contexts (TutorialContext, ProgressContext)
3. Create first tutorial component (Installation)
4. Add CodeEditor simulator
5. Implement progress tracking

See [tasks.md](tasks.md) for detailed implementation tasks.
