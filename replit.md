# Random Country Explorer

## Overview

Random Country Explorer is an educational web application that allows users to discover random countries from around the world. The app presents country information in an engaging, card-based interface with interactive maps, flags, and detailed statistics including population, area, languages, and currencies. Built with a modern tech stack, it fetches country data from the REST Countries API and displays it through a clean, responsive UI inspired by Duolingo's playful interactions and Google Material's card layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, using Vite as the build tool and development server.

**UI Framework**: shadcn/ui components built on Radix UI primitives, styled with Tailwind CSS using the "new-york" style variant. The design system uses CSS variables for theming with support for light/dark modes.

**State Management**: TanStack Query (React Query) for server state management with optimistic updates and caching. Query client is configured with infinite stale time and disabled refetching on window focus to minimize unnecessary API calls.

**Routing**: Wouter for lightweight client-side routing (single page application with minimal routes).

**Map Integration**: Leaflet for interactive geographic visualization, displaying country locations with custom markers.

**Component Organization**: 
- Shared UI components in `client/src/components/ui/` (shadcn/ui library)
- Feature-specific components like `CountryMap` in `client/src/components/`
- Pages in `client/src/pages/` (Home, NotFound)
- Custom hooks in `client/src/hooks/`

**Styling Approach**: Utility-first with Tailwind CSS, following a consistent spacing scale (2, 4, 6, 8, 12, 16) and custom color tokens defined via CSS variables. Typography uses Inter for body text and Space Grotesk for headings.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with a single endpoint `/api/random-country` that returns formatted country data.

**Data Storage Strategy**: In-memory caching with `MemStorage` class that:
- Fetches all countries from REST Countries API on first request
- Caches data for 1 hour to reduce external API calls
- Falls back to stale cache if API is unavailable
- Transforms raw API data into a clean `CountryDisplay` format

**Data Transformation**: Server-side formatting of numbers (using Intl.NumberFormat) and structuring of country data to simplify frontend consumption.

**Development Environment**: Custom Vite middleware integration for hot module replacement (HMR) during development, with production build serving static assets from `dist/public`.

### Type Safety

**Shared Schema**: Zod schemas in `shared/schema.ts` provide runtime validation and TypeScript types for country data, ensuring type safety between frontend and backend.

**Path Aliases**: Configured TypeScript paths (`@/`, `@shared/`, `@assets/`) for cleaner imports across the codebase.

### Build System

**Build Process**: 
- Frontend: Vite bundles React application into `dist/public`
- Backend: esbuild bundles server code into `dist/` as ESM modules
- Single production command serves both static files and API routes

**Development Workflow**: Concurrent development server running both Vite dev server (with HMR) and Express backend, proxied through Vite middleware.

## External Dependencies

### Third-Party APIs

**REST Countries API** (`https://restcountries.com/v3.1/all`): Primary data source for country information including names, capitals, regions, populations, areas, languages, currencies, flags, and geographic coordinates. Data is fetched with selective fields to optimize payload size.

### Database

**Database Setup**: Drizzle ORM configured for PostgreSQL with Neon Database serverless driver. Schema defined in `shared/schema.ts` with migrations output to `./migrations`. Currently configured but not actively used in the application logic (data comes from REST Countries API cache).

**Future Consideration**: Database infrastructure is present for potential features like user accounts, saved countries, or favorites.

### Map Services

**OpenStreetMap Tiles**: Leaflet uses OSM tile servers for rendering interactive maps (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).

### UI Libraries

**Radix UI**: Comprehensive set of unstyled, accessible component primitives (dialogs, popovers, dropdowns, etc.) that form the foundation of the shadcn/ui components.

**shadcn/ui**: Pre-built, customizable components following the "new-york" design system with Tailwind CSS integration.

### Fonts

**Google Fonts**: Inter (primary body font) and Space Grotesk (accent/heading font) loaded via CDN for typography.

### Development Tools

**Replit Plugins**: Integration with Replit-specific Vite plugins for development banner, error overlay, and cartographer (in development mode only).