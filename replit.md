# GameName Generator

## Overview

GameName Generator is a modern web application that generates gaming nicknames using various algorithms and themes. Built with React on the frontend and Express.js on the backend, it provides users with an intuitive interface to create personalized gaming usernames. The application features real-time generation, favorites management, search functionality, and user statistics tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with a custom gaming-themed design system featuring dark mode and neon color schemes
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface elements
- **State Management**: TanStack Query (React Query) for server state management, caching, and data synchronization
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework using ESM modules
- **Language**: TypeScript for type safety across the entire stack
- **API Design**: RESTful API endpoints with proper HTTP status codes and JSON responses
- **Middleware**: Custom logging middleware for request/response tracking and error handling
- **Session Management**: In-memory storage with session-based user tracking for statistics
- **Data Storage**: In-memory storage implementation with interface-based design for easy database migration

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Database**: PostgreSQL support with Neon serverless driver integration
- **Schema Management**: Shared TypeScript schemas between frontend and backend using Zod for validation
- **Migrations**: Drizzle Kit for database schema migrations and updates

### Generation Engine
- **Algorithms**: Three distinct nickname generation approaches:
  - Random: Pure randomization from curated word lists
  - Syllabic: Phonetically-based combinations for pronounceable names
  - Thematic: Context-aware generation based on selected themes
- **Themes**: Six categories (fantasy, sci-fi, military, cute, edgy, neutral) with theme-specific word banks
- **Customization**: Configurable parameters for length, style, and complexity

### Development Environment
- **Hot Reload**: Vite development server with HMR for instant feedback
- **Error Handling**: Runtime error overlay and comprehensive error boundaries
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Organized import structure with @ aliases for clean code organization

## External Dependencies

### Core Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration layer for form validation
- **wouter**: Lightweight routing solution
- **tailwindcss**: Utility-first CSS framework

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM for database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store (prepared for future use)
- **tsx**: TypeScript execution environment for development

### Build and Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **esbuild**: JavaScript bundler for production builds
- **drizzle-kit**: Database schema management and migrations

### Validation and Utilities
- **zod**: Schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod
- **clsx**: Conditional className utility
- **class-variance-authority**: Component variant management
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation

### UI Enhancement Libraries
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library with React components
- **tailwind-merge**: Intelligent Tailwind class merging