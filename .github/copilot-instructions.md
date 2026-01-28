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

### Routing (TanStack Router)

- Create route files in `src/routes/` directory
- Each route uses `createRoute` and exports the route definition
- **CRITICAL**: After creating a new route, you MUST add it to the `routeTree` in [src/routes/router.tsx](src/routes/router.tsx) for full type safety
- Import the new route and add to `RootRoute.addChildren([...])` array
- Example: `import { myRoute } from 'routes/myRoute'` then add `myRoute` to the children array
- Failing to register routes breaks type inference and autocompletion

## File Structure

### Standard Folder Organization

```
src/
  main.tsx           # Application entry point, renders App with StrictMode
  App.tsx            # Root component
  App.css            # Global styles (prefer MUI sx prop for new code)
  index.css          # CSS reset and base styles

  components/        # Reusable UI components
    Dashboard.tsx
    Navbar.tsx
    common/          # Shared/generic components
      Button.tsx
      Modal.tsx
    layout/          # Layout components
      Header.tsx
      Sidebar.tsx
      Footer.tsx

  hooks/             # Custom React hooks
    useAuth.ts
    useLocalStorage.ts
    useFetch.ts

  api/               # API client and service layer
    client.ts        # Base API client configuration (axios/fetch)
    services/        # API service modules
      auth.ts
      users.ts
      products.ts

  config/            # Configuration files
    theme.ts         # MUI theme configuration
    constants.ts     # App-wide constants
    env.ts           # Environment variables

  utils/             # Helper functions and utilities
    formatDate.ts
    validators.ts
    storage.ts

  types/             # TypeScript types/interfaces
    user.ts
    api.ts
    common.ts

  routes/            # Route definitions (TanStack Router)
    __root.tsx
    index.tsx
    about.tsx

  assets/            # Static assets
    images/
    fonts/
    icons/
```

### Folder Guidelines

**components/** - UI components organized by feature or type

- Export components as default: `export default function Dashboard() {}`
- Use PascalCase for component files: `MyComponent.tsx`
- Group related components in subfolders: `components/auth/LoginForm.tsx`
- Common/shared components go in `components/common/`
- Layout components (Header, Sidebar, Footer) go in `components/layout/`

**hooks/** - Custom React hooks following naming convention

- Prefix with `use`: `useAuth.ts`, `useDebounce.ts`
- Export as named export: `export function useAuth() {}`
- One hook per file unless tightly coupled
- Import: `import { useAuth } from 'hooks/useAuth'`

**api/** - Centralized API layer

- `api/client.ts` - Base HTTP client setup (axios instance, interceptors)
- `api/services/` - API methods grouped by domain/resource
- Return typed responses: `Promise<User>`, `Promise<Product[]>`
- Handle errors consistently in client or services
- Example: `import { getUsers } from 'api/services/users'`

**config/** - Configuration and setup files

- `theme.ts` - MUI theme customization (colors, typography, components)
- `constants.ts` - App constants (API URLs, feature flags, enums)
- `env.ts` - Environment variable helpers and validation
- Export const objects: `export const theme = createTheme({...})`

**utils/** - Pure utility functions

- Small, reusable helpers that don't depend on React
- Export named functions: `export function formatCurrency(value: number) {}`
- Keep functions focused and testable
- Examples: formatters, validators, converters, parsers

**types/** - TypeScript type definitions

- Organize by domain: `user.ts`, `product.ts`, `api.ts`
- Use interfaces for objects: `export interface User {}`
- Use types for unions/intersections: `export type Status = 'active' | 'inactive'`
- Common/shared types in `types/common.ts`

**routes/** - Route components (TanStack Router)

- File-based routing: `__root.tsx`, `index.tsx`, `about.tsx`
- Each route exports a route definition
- Import components from `components/` for route content

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
