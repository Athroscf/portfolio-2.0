# Use Node.js 18 Alpine as it's lightweight
FROM node:18-alpine AS builder

# Install pnpm
RUN apk add --no-cache curl && \
    curl -fsSL https://get.pnpm.io/install.sh | sh -

# Add pnpm to PATH
ENV PATH="/root/.local/share/pnpm:$PATH"

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy pnpm-lock.yaml and package.json
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the application
RUN pnpm run build

# Start a new stage for a smaller production image
FROM node:18-alpine

# Install pnpm
RUN apk add --no-cache curl && \
    curl -fsSL https://get.pnpm.io/install.sh | sh -

# Add pnpm to PATH
ENV PATH="/root/.local/share/pnpm:$PATH"

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built app from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]