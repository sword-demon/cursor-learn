# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cursor Tutorial Website - 交互式 Cursor IDE 快速入门网站
Live: https://cursor-tutorial.wjstar.top

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run test       # Vitest (single run, --run flag)
npm run preview    # Preview production build

# Run a single test file
npx vitest run src/components/speckit/__tests__/TerminalSimulator.test.tsx

# Run tests matching a pattern
npx vitest run --reporter=verbose -t "pattern"
```

## Tech Stack

React 19 + TypeScript 5.9 + Vite 7.3 + Tailwind CSS 4 + React Router DOM 7 + Framer Motion 12 + Monaco Editor 4.7. Testing with Vitest + React Testing Library (jsdom).

## Architecture

No backend. All persistence via localStorage. Desktop-first (min 768px viewport). All routes lazy-loaded with React.lazy().

### State Management

Two React Contexts, no Redux:
- `ProgressContext` - user progress and preferences, persisted to localStorage key `cursor-tutorial:progress`
- `TutorialContext` - current tutorial navigation state (in-memory only)

### Data Flow

Static tutorial/scenario data lives in `src/data/`. Services in `src/services/` handle business logic (tutorial registry, progress CRUD, simulation validation). Contexts consume services and expose state to components via hooks.

### Layout System

Two layout wrappers in `src/App.tsx`:
- `SimpleLayout` - Header + content (home page only)
- `TutorialLayout` - Header + Sidebar + content (all tutorial pages)

### Routing

Routes defined in `src/App.tsx`. Major route groups:
- `/` - Home
- `/installation`, `/commands`, `/commands/:commandId`, `/rules`, `/project` - Core tutorials
- `/config/*` - Config tutorials (ignore, shortcuts, extensions, themes, shell, worktrees)
- `/agents/*` - Agent tutorials (7 pages)
- `/spec-kit/*` - Spec-Kit tutorials (4 pages)
- `/skills/*` - Skills tutorials (5 pages)

### Path Aliases

Configured in both `vite.config.ts` and `tsconfig.app.json`:
- `@` → `src/`
- `@components` → `src/components/`
- `@hooks` → `src/hooks/`
- `@types` → `src/types/`
- `@data` → `src/data/`
- `@utils` → `src/utils/`
- `@services` → `src/services/`

## Theme

China Red primary (#C41E3A), Gold accent (#FFD700). Custom CSS variables defined in `src/index.css` via Tailwind v4 `@theme`. Fonts: DM Sans (body), Space Grotesk (headings), JetBrains Mono (code).

## Testing

Vitest with jsdom, globals enabled. Setup file: `src/test-setup.ts`. Tests co-located with source in `__tests__/` directories. Pattern: mock framer-motion to avoid animation issues in tests.

## Key Types

Core type definitions in `src/types/`:
- `tutorial.ts` - Tutorial, TutorialStep, SkillCard, AgentExample
- `simulation.ts` - SimulationScenario, SimulationStep (command types: tab, ctrl-k, ctrl-l, at-mention)
- `user.ts` - UserProgress, TutorialProgress, UserPreferences

## Specs

Feature specifications in `specs/` with subdirectories per feature (001-004). Each contains spec.md, plan.md, data-model.md, tasks.md.
