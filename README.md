# React + TypeScript + Vite + Tanstack Router + Material UI template

A modern, opinionated React template with Material-UI, TanStack Router, and TypeScript. Built for developers who want to start building features immediately without spending time on initial setup and configuration.

## Overview

This template provides a production-ready foundation with:

- **React 19** - Latest React with StrictMode enabled
- **TypeScript** - Strict mode with comprehensive type checking
- **Material-UI v7** - Complete UI component library with Emotion styling
- **TanStack Router** - Type-safe routing with file-based organization
- **TanStack Form** - Headless form management with built-in validation
- **TanStack Query** - Powerful data fetching and caching
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

## Adding Routes (TanStack Router - File-Based)

This template uses **file-based routing** with automatic route generation:

1. Create a route file in `src/routes/` (e.g., `my-page.tsx`)
2. Export the route using `createFileRoute`:

   ```tsx
   import { createFileRoute } from '@tanstack/react-router'
   import MyComponent from 'components/MyComponent'

   export const Route = createFileRoute('/my-page')({
     component: MyComponent,
   })
   ```

3. The route is **automatically registered** - no manual setup needed!

**File naming conventions:**

- `src/routes/index.tsx` → `/`
- `src/routes/about.tsx` → `/about`
- `src/routes/my-page.tsx` → `/my-page`
- `src/routes/__root.tsx` → Root layout wrapper

**Why file-based routing?**

- No manual route tree management
- Automatic type generation
- Better developer experience with less boilerplate

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
