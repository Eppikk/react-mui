# React + TypeScript + Vite + Tanstack Router + Material UI template

A modern, opinionated React template with Material-UI, TanStack Router, and TypeScript. Built for developers who want to start building features immediately without spending time on initial setup and configuration.

## Overview

This template provides a production-ready foundation with:

- **React 19** - Latest React with StrictMode enabled
- **TypeScript** - Strict mode with comprehensive type checking
- **Material-UI v7** - Complete UI component library with Emotion styling
- **TanStack Router** - Type-safe routing with file-based organization
- **Vite** - Lightning-fast dev server using experimental Rolldown bundler
- **Absolute Imports** - Clean imports from `src` root (no `../../../` paths)
- **ESLint + Prettier** - Consistent code style and formatting
- **Pre-configured Theme** - Customizable Material-UI theme setup

### Opinionated Choices

This template makes specific architectural decisions to promote consistency and best practices:

- **Folder structure** - Organized by feature type (`components/`, `hooks/`, `api/`, `config/`, etc.)
- **Absolute imports** - All imports use `src` as base path
- **Single quotes, no semicolons** - Prettier formatting rules
- **Functional components only** - Modern React patterns with hooks
- **MUI `sx` prop** - Component-scoped styling instead of separate CSS files
- **Flat ESLint config** - Using ESLint 9+ configuration format

## Getting Started

```bash
npm install
npm start
```

Visit `http://localhost:3000` to see the template in action.

## Adding Routes (TanStack Router)

When creating a new route:

1. Create a route file in `src/routes/` (e.g., `mypage.tsx`)
2. Export a route using `createRoute`:

   ```tsx
   import { createRoute } from '@tanstack/react-router'
   import { RootRoute } from './__root'
   import MyComponent from 'components/MyComponent'

   export const myPageRoute = createRoute({
     getParentRoute: () => RootRoute,
     path: '/mypage',
     component: MyComponent,
   })
   ```

3. **CRITICAL**: Register the route in `src/routes/router.tsx`:

   ```tsx
   import { myPageRoute } from 'routes/mypage'

   const routeTree = RootRoute.addChildren([
     Route,
     aboutRoute,
     myPageRoute, // Add your new route here
   ])
   ```

Failing to register routes in the `routeTree` breaks TypeScript type inference and autocompletion for links and navigation.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
