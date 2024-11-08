# Base Image
ARG BASE_IMAGE
FROM ${BASE_IMAGE} as builder
WORKDIR /app

# Install npm
RUN npm install -g npm@latest

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy only necessary files, excluding cdk
COPY . .
RUN rm -rf cdk

# Accept build argument
ARG RESEND_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Pass the build argument to the runtime environment
ARG RESEND_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]