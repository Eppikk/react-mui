# React + MUI Template - Copilot Instructions

## Project Overview

Minimal React 19 + TypeScript + Material-UI template using Vite with absolute path imports. Includes Emotion styling, MUI Icons, and Prettier formatting.

## Tech Stack & Key Decisions

- **Build Tool**: Vite using `rolldown-vite@7.2.5` (experimental Rust-based bundler via npm override)
- **UI Library**: Material-UI v7 with Emotion for styling (`@mui/material`, `@mui/icons-material`)
- **React**: Version 19.2.0 with StrictMode enabled in [src/main.tsx](src/main.tsx)
- **TypeScript**: Strict mode with project references and path aliases configured
- **Formatting**: Prettier with single quotes, no semicolons (see [.prettierrc](.prettierrc))
- **Linting**: ESLint 9+ flat config with React Hooks and React Refresh plugins

## Development Workflow

```bash
npm run dev           # Start dev server with HMR
npm run build         # TypeScript check + production build
npm run lint          # ESLint check
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
npm run preview       # Preview production build locally
```

**Note**: Build script runs `tsc -b` before Vite build to ensure type checking (Vite skips this by default).

## Code Conventions

### Import Paths (vite-tsconfig-paths)

Use absolute imports from the `src` directory (baseUrl is set to "src" in [tsconfig.app.json](tsconfig.app.json)):

```tsx
import { MyComponent } from 'components/MyComponent' // src/components/*
import { useCustomHook } from 'hooks/useCustomHook' // src/hooks/*
import { formatDate } from 'utils/formatDate' // src/utils/*
import type { User } from 'types/user' // src/types/*
```

**Never** use relative imports like `../../../components` - always use absolute imports from src root.

### Material-UI Patterns

- Import components from `@mui/material`: `import { Button, Box } from '@mui/material'`
- Import icons from `@mui/icons-material`: `import AddIcon from '@mui/icons-material/Add'`
- Use `sx` prop for component-specific styles (avoids separate CSS files)
- Wrap app in `ThemeProvider` in [src/main.tsx](src/main.tsx) for custom themes

### TypeScript Configuration

- Use `bundler` module resolution (not `node16`)
- Include `.tsx` extensions in imports allowed (`allowImportingTsExtensions: true`)
- Strict linting: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Separate configs for app ([tsconfig.app.json](tsconfig.app.json)) and tools ([tsconfig.node.json](tsconfig.node.json))

### ESLint & Prettier

- ESLint uses flat config format (`eslint.config.js`) with `defineConfig`
- Prettier runs before commits - use `npm run format` to auto-fix
- Config: single quotes, no semicolons, trailing commas ES5, 100 char width
- Always ignore `dist/` and `node_modules/` in [.prettierignore](.prettierignore)

### React Patterns

- Functional components only (see [src/App.tsx](src/App.tsx))
- Hooks for state management (`useState`, `useEffect`)
- TSX files use `.tsx` extension explicitly in imports
- Entry point is [src/main.tsx](src/main.tsx) with `createRoot` API

## File Structure

```
src/
  main.tsx           # Application entry point, renders App with StrictMode
  App.tsx            # Root component
  App.css            # Global styles (prefer MUI sx prop for new code)
  index.css          # CSS reset and base styles
  components/        # Reusable UI components (import from 'components/*')
  hooks/             # Custom React hooks (import from 'hooks/*')
  utils/             # Helper functions (import from 'utils/*')
  types/             # TypeScript types/interfaces (import from 'types/*')
  assets/            # Static assets (images, fonts, etc.)
```

## Common Gotchas

- **Vite Override**: This template uses `rolldown-vite` instead of standard Vite. If tooling behaves unexpectedly, check the override in [package.json](package.json).
- **Absolute Imports**: Require `vite-tsconfig-paths` plugin - already configured in [vite.config.ts](vite.config.ts). BaseUrl is set to "src" for cleaner imports.
- **Type-Aware Linting**: Not enabled by default. To add, follow [README.md](README.md) for `tseslint.configs.recommendedTypeChecked`.
- **React Compiler**: Intentionally disabled for performance (see [README.md](README.md)).
- **Prettier Conflicts**: ESLint doesn't include formatting rules - use Prettier for all formatting.

## Key Files to Reference

- [vite.config.ts](vite.config.ts) - Vite config with React plugin and tsconfig paths
- [tsconfig.app.json](tsconfig.app.json) - TypeScript config with baseUrl set to src
- [eslint.config.js](eslint.config.js) - Flat config with React plugins
- [.prettierrc](.prettierrc) - Code formatting rules
