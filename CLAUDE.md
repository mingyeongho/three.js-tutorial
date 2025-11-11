# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Three.js tutorial project built with Next.js 16 (App Router) that demonstrates 3D graphics and visual effects using React Three Fiber (@react-three/fiber) and related libraries. The project includes examples of ASCII effects and 3D scene rendering with GLTF models.

## Commands

### Development
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Framework Stack
- **Next.js 16** with App Router (app directory)
- **React 19.2** with RSC (React Server Components) enabled
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** with postcss for styling

### 3D Graphics Stack
- **Three.js** (^0.181.0) - Core 3D library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components and utilities for R3F
- **@react-three/postprocessing** - Post-processing effects
- **maath** - Math helpers for 3D

### UI Components
- Custom component library based on shadcn/ui patterns (New York style)
- Components follow data-slot pattern for flexible styling
- Uses `cn()` utility (clsx + tailwind-merge) for className composition
- Lucide React for icons

### Path Aliases
```typescript
@/*        → Root directory (./*)
@/components → ./components
@/lib      → ./lib
@/hooks    → ./hooks
```

## Project Structure

### App Directory Organization
- `app/page.tsx` - Root page (currently using Card component)
- `app/layout.tsx` - Root layout with Korean locale (lang="ko-KR")
- `app/shopping/` - 3D shopping scene example
  - `page.tsx` - Route entry point
  - `_components/playground.tsx` - Canvas setup with camera configuration
  - `_components/SceneGraph.tsx` - 3D scene with GLTF model loading

### Component Pattern
Route-specific components use `_components/` subdirectory pattern (Next.js convention to exclude from routing).

### 3D Scene Pattern
The shopping example demonstrates the typical R3F setup:
1. **Canvas wrapper** (`playground.tsx`) - Configures camera, renderer settings (antialias, dpr, flat rendering)
2. **Scene graph** (`SceneGraph.tsx`) - Loads GLTF models using `useGLTF` hook and applies environment maps

### Assets
3D models are stored in `public/` directory (e.g., `kitchen-transformed.glb`).

## Key Technical Details

### TypeScript Configuration
- Target: ES2017
- JSX: react-jsx (using new JSX transform)
- Module resolution: bundler (Next.js optimized)
- Path mapping configured for `@/*` alias

### Component Development
- UI components in `components/ui/` follow composition pattern
- Use `cn()` from `@/lib/utils` for conditional className merging
- Components use data-slot attributes for styling hooks
- Prefer React.ComponentProps<"element"> for prop typing

### 3D Development
- Use `"use client"` directive for all R3F components (client-side only)
- GLTF models accessed via `useGLTF` hook from @react-three/drei
- Environment maps loaded with `useEnvironment` hook
- Canvas camera configuration: fov: 25, near: 1, far: 20, position: [0, 1, 6]
- Default lighting: ambientLight with intensity of 1.5 * Math.PI

## Recent Development History
The project has evolved from initial setup to implementing ASCII effects using both vanilla Three.js and React Three Fiber approaches. The current focus appears to be on building 3D product visualization scenes.
