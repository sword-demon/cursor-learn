# Research: Cursor Tutorial Website

**Date**: 2026-02-13
**Feature**: Cursor Tutorial Website

---

## Executive Summary

This research document consolidates technology decisions for building an interactive Cursor IDE tutorial website. All decisions align with the Project Constitution constraints (React Context/hooks, desktop-first, localStorage, China Red theme).

---

## D1: Code Editor Component

**Decision**: Use Monaco Editor (@monaco-editor/react)

### Rationale

1. **Familiarity**: Cursor is built on VS Code, which uses Monaco. Users will see the same editor they use in Cursor.
2. **Features**: Syntax highlighting, IntelliSense, keyboard shortcuts, minimap - all essential for realistic simulation.
3. **Cursor Command Simulation**: Can intercept keyboard events to trigger tutorial actions (Tab, Ctrl+K, etc.).

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Monaco Editor | Familiar to VS Code/Cursor users, feature-rich | Bundle size (~1MB) | CHOSEN |
| CodeMirror 6 | Lighter weight, highly customizable | Less familiar UI, more setup | Rejected - familiarity wins |
| Ace Editor | Mature, used by many sites | Dated appearance, less VS Code-like | Rejected - UX mismatch |
| Custom Editor | Full control, minimal bundle | Massive development effort | Rejected - violates YAGNI |

### Implementation Notes

- Use `@monaco-editor/react` for easier React integration
- Lazy load editor to reduce initial bundle size
- Custom keybindings to override default Monaco behavior for tutorial purposes

---

## D2: Animation Library

**Decision**: Framer Motion

### Rationale

1. **React Integration**: Native React support, declarative API
2. **Tutorial Use Cases**: Step transitions, command highlighting, progress animations
3. **Performance**: Hardware-accelerated, respects `prefers-reduced-motion`

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Framer Motion | Excellent React integration, gestures, AnimatePresence | Bundle size (~40KB) | CHOSEN |
| React Spring | Physics-based, flexible | Steeper learning curve | Rejected - Framer simpler |
| CSS Animations | No bundle cost | Limited interactivity, harder to orchestrate | Rejected - need JS control |
| GSAP | Industry standard, powerful | Overkill for this project, larger bundle | Rejected - too complex |

### Implementation Notes

- Use for tutorial step transitions
- Animate command highlights in simulator
- Page transitions between tutorial sections

---

## D3: Routing Solution

**Decision**: React Router DOM v6

### Rationale

1. **Standard**: De facto standard for React SPAs
2. **Deep Linking**: Users can bookmark specific tutorials
3. **History Management**: Enables back/forward navigation through tutorial steps

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| React Router v6 | Mature, well-documented, large ecosystem | None significant | CHOSEN |
| TanStack Router | Type-safe, modern | Newer, smaller community | Rejected - unnecessary complexity |
| Wouter | Minimal, tiny bundle | Less feature-rich | Rejected - need nested routes |
| Custom Router | Full control | Reinventing the wheel | Rejected - violates YAGNI |

### Implementation Notes

- Nested routes for tutorial steps: `/tutorials/commands/:stepId`
- Route guards for progress tracking
- Scroll restoration on navigation

---

## D4: State Persistence

**Decision**: localStorage with custom React hook

### Rationale

1. **Constitution Compliance**: Meets Principle III (Local Storage Persistence)
2. **Simplicity**: No backend, no auth complexity
3. **Offline Capability**: Users can continue tutorials without internet

### Data to Persist

- `tutorial-progress`: Completed steps, current position
- `user-preferences`: Theme, OS selection, editor settings
- `simulation-history`: Practice attempts, success rate

### Migration Path

Future backend integration:
```typescript
// Current: localStorage only
const progress = localStorage.getItem('tutorial-progress')

// Future: Sync to backend
const progress = await api.sync(localStorage.getItem('tutorial-progress'))
```

### Storage Limits

- localStorage: ~5-10MB
- Estimated usage: <100KB (text data only)
- Compression: Use `lz-string` if needed

---

## D5: Styling Approach

**Decision**: Tailwind CSS + CSS Variables

### Rationale

1. **Development Speed**: Utility-first enables rapid UI development
2. **Theme Compliance**: Easy to implement China Red theme via config
3. **Bundle Size**: PurgeCSS removes unused styles in production

### Theme Configuration

```javascript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: '#C41E3A',  // China Red
    dark: '#A01830',
    light: '#E02E4A'
  },
  accent: {
    DEFAULT: '#FFD700',  // Gold
    dark: '#D4AF37',
    light: '#FFEC8B'
  }
}
```

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Tailwind CSS | Fast development, easy theming, purged bundle | HTML can get verbose | CHOSEN |
| CSS Modules | Scoped styles, vanilla CSS | More boilerplate, harder theming | Rejected - slower dev |
| Styled Components | Dynamic styles, familiar CSS syntax | Runtime overhead, larger bundle | Rejected - Constitution prefers simple |
| Plain CSS | No build step | Manual organization, no utilities | Rejected - too slow |

---

## D6: Build Tool

**Decision**: Vite

### Rationale

1. **Speed**: Fast dev server, optimized production builds
2. **React**: First-class React/TypeScript support
3. **Windows**: Works well on Windows (PowerShell support)

### Configuration

- TypeScript path aliases: `@/components`, `@/hooks`
- Environment variables for feature flags
- Build optimization: Code splitting by route

---

## D7: Testing Strategy

**Decision**: Vitest + React Testing Library

### Rationale

1. **Vite Integration**: Native Vitest support with Vite projects
2. **React Focus**: RTL provides React-specific testing utilities
3. **Simplicity**: No complex test setup, fast execution

### Test Categories

- **Unit**: Utility functions, hooks
- **Component**: Tutorial components, simulator interactions
- **Integration**: Full tutorial flow simulation

---

## Technology Stack Summary

| Category | Technology | Version |
|----------|------------|---------|
| Language | TypeScript | 5.x |
| Framework | React | 18.x |
| Build Tool | Vite | 5.x |
| Routing | React Router DOM | 6.x |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 11.x |
| Editor | Monaco Editor | 0.45.x |
| Testing | Vitest + RTL | 1.x + 14.x |
| State | React Context/Hooks | Built-in |
| Storage | localStorage | Built-in |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Monaco bundle size | Medium | Medium | Lazy load, code splitting |
| localStorage quota | Low | High | Monitor size, compress data |
| Browser compatibility | Low | Medium | Target modern browsers only |
| Performance with animations | Low | Medium | Use `will-change`, test on low-end devices |

---

## References

- [Cursor Documentation](https://cursor.com/cn/docs)
- [Monaco Editor React](https://github.com/suren-atoyan/monaco-react)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
