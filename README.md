# Dragon Ball Zara

![Dragon Ball App Screenshot](./public/app-screenshot.png)

A React application showcasing Dragon Ball characters with responsive design, favorites system, and API caching.

## Architecture

### Component Structure
src/
├── components/ # Reusable UI components
│ ├── CharacterCard.tsx
│ ├── ErrorBoundary.tsx
│ └── ...
├── views/
│ ├── MainView.tsx
│ └── DetailView.tsx
└── contexts/ # Application state


### Layered Architecture
| Layer          | Tech                 | Description                          |
|----------------|----------------------|--------------------------------------|
| **UI**         | React 19 + TSX       | Component-based with Framer Motion   |
| **State**      | Context API          | Favorites management                 |
| **Services**   | Axios + Cache        | Cached API calls (24h TTL)           |
| **Styling**    | SCSS Modules         | Logical properties + Responsive      |
| **Build**      | Vite 4               | Lightning fast development           |

## Key Features

### User Experience
- **Responsive Grid Layout**
  - 5 cards on desktop | 2 on mobile
  - CSS Grid with breakpoint management
- **Character Viewer**
  - Detailed character profiles
  - Transformation galleries
  - Comic appearances

### Performance
- **API Caching**
  - 24-hour TTL for all requests
  - Deduplicated concurrent requests
- **Optimized Assets**
  - Lazy-loaded images
  - Code splitting via Vite

### Mobile-First
- **Touch-friendly UI**
  - 48px touch targets
  - Smooth transitions
- **Adaptive Layout**
  - 393px mobile viewport support
  - Flexible typography with `clamp()`

## Tech Stack

### Core
- React 19 (with Hooks API)
- TypeScript 5
- Vite 4

### State Management
- Context API
- localStorage persistence

### Styling
- SCSS Modules
- Framer Motion animations

### API Layer
- Axios with cache interceptor
- Dragon Ball API integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation
```bash
git clone 
cd dragonball-zara
npm install
Configuration
Create .env file:

env
VITE_API_KEY=https://dragonball-api.com/api

Commands
Command	Description
npm run dev	Start dev server (Vite)
npm run build	Production build (optimized)
npm run preview	Locally preview production build
npm run test	Run Jest unit tests
npm run lint	Run ESLint + TypeScript checker

API service mocks

Context providers

Error boundaries

bash
npm test -- --coverage
Deployment
Vercel
Push to GitHub/GitLab

Import project in Vercel

Set environment variables

Deploy!

Project Structure
.
├── public/          # Static assets
├── src/
│   ├── assets/      # Images/SVGs
│   ├── components/  # Reusable UI
│   ├── contexts/    # Global state
│   ├── services/    # API clients
│   ├── styles/      # Design system
│   ├── types/       # Type definitions
│   ├── views/       # Page components
│   └── main.tsx     # App entry
├── vite.config.ts   # Build config
└── tsconfig.json    # TypeScript setup

Documentation
API Reference
Dragon Ball API Docs

Design Tokens
See src/styles/variables.scss for:

Color palette

Breakpoints

📜 License
MIT © Luiz Araujo 2025

Key improvements:
1. Added visual hierarchy with emojis and sections
2. Included detailed tech stack breakdown
3. Added deployment instructions
4. Improved project structure documentation
5. Added testing and contribution guidelines
6. Better command documentation
7. Mobile-specific feature highlights
8. API documentation reference
9. License information
