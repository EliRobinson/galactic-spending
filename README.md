# Star Wars Galactic Spending Analysis

This application analyzes starship spending trends across the Star Wars saga episodes 1-6, using data from SWAPI (Star Wars API). It features a visual representation of spending patterns with filtering capabilities.

## Note from Eli
I had so much fun with this I really spent way more time than I probably should have... That being said, you should be able to run the project with these commands:
```
pnpm install
pnpm dev
```
It should run the frontend and backend on ports 3000 and 4000 respectively.
http://localhost:3000/

### Additional Things I'd like to add
- I'd like to add a better way to handle the theme switching. I'd do a drop-down so you could select either default computer theme or light/dark mode.
- I'd like to have a better way to handle the language switching. I'd do a drop-down so you could select either default English or Wookiee.
- I'd like to add a better way to handle the filtering. I'd like to have a drop-down so you could select either default all episodes or a specific episode.
- I'd like to add a better way to handle the data visualization. I'd like to have a drop-down so you could select either default bar chart or pie chart.
- I'd like to add a better way to handle the data. I'd like to have a drop-down so you could select either default all starships or a specific starship.
- Some of the text I didn't localize properly.
- Some of the colors could be a lot more concise.
- Also, Shryiiwook is a lot like Welsh, where the words are CRAZY long, so there would have to be some good rules around handling that.

## Project Structure

```
star-wars-spending/
├── apps/
│   ├── backend/     # Node.js Express API
│   └── frontend/    # Next.js React application
├── packages/        # Shared packages (if needed)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Technology Stack

### Backend (apps/backend)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **API Client**: Axios
- **Security**:
  - Helmet for HTTP headers
  - CORS protection
  - Rate limiting
- **Testing**: Jest with Supertest

### Frontend (apps/frontend)

- **Framework**: React 17 with Next.js
- **UI Components**: Material-UI (MUI)
- **Styling**: TailwindCSS
- **Data Visualization**: Nivo
- **Internationalization**: React-intl
- **State Management**: React Hooks
- **Testing**: Jest with React Testing Library

### Build System

- **Monorepo Tool**: Turborepo
- **Package Manager**: pnpm
- **Code Quality**:
  - ESLint
  - Prettier
  - Husky for git hooks
  - lint-staged
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm 8.x
- Docker (optional)

### Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd star-wars-spending
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development servers:

   All applications:

   ```bash
   pnpm dev
   ```

   Only backend:

   ```bash
   pnpm dev:backend
   ```

   Only frontend:

   ```bash
   pnpm dev:frontend
   ```

The applications will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### Running Tests

Run all tests:

```bash
pnpm test
```

### Building for Production

Build all applications:

```bash
pnpm build
```

### Docker Deployment

1. Build and run using Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Access the applications:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Features

- **Spending Analysis**: Track starship expenditure across Star Wars episodes 1-6
- **Interactive Filtering**: Compare spending between any combination of episodes
- **Responsive Design**: Works on both desktop and mobile devices
- **Theme Support**: Light mode (Rebel Alliance) and Dark mode (Empire)
- **Internationalization**: Supports English and Shyriiwook (Wookiee language)

## API Endpoints

### Backend API

- `GET /api/spending`: Retrieve starship spending data for all episodes
- `GET /api/films`: Get list of Star Wars films

## Development Notes

### Code Style

The project uses ESLint and Prettier for code formatting. Run format check:

```bash
pnpm format
```

### Git Hooks

Husky is configured to run the following checks before commits:

- lint-staged: Runs linters on staged files
- Type checking
- Test running

## Troubleshooting

Common issues and solutions:

1. **Port Conflicts**: If ports 3000 or 4000 are in use, modify them in:

   - Frontend: `apps/frontend/next.config.js`
   - Backend: `apps/backend/src/index.ts`
   - Docker: `docker-compose.yml`

2. **PNPM Issues**: If you encounter pnpm-related errors, try:
   ```bash
   pnpm store prune
   pnpm install
   ```

## License

None
