# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.x --activate

# Set pnpm store directory
ENV PNPM_HOME="/pnpm/store"
RUN mkdir -p $PNPM_HOME

COPY . .
RUN pnpm install
RUN pnpm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.x --activate

COPY --from=builder /app/apps/backend/dist ./backend/dist
COPY --from=builder /app/apps/frontend/.next ./frontend/.next
COPY --from=builder /app/apps/frontend/public ./frontend/public
COPY --from=builder /app/package*.json ./
RUN pnpm install --prod
EXPOSE 3000
EXPOSE 4000
CMD ["pnpm", "start"] 