# Base Image
FROM node:18-alpine as builder
WORKDIR /app

RUN npm install -g npm@latest

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the application
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]