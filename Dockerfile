# syntax=docker/dockerfile:1

# Stage 1: Build
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# npm update
RUN npm i -g npm@latest

# Install OpenSSL (required by Prisma)
# RUN apt-get update -y && apt-get install -y openssl
RUN apk add --no-cache openssl

# Copy package files first for better caching
COPY --link package.json package-lock.json ./

# Copy Prisma schema files **before** running npm ci
COPY --link prisma ./prisma

# Install dependencies
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy application files
COPY --link . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:24-alpine AS final

# Set working directory
WORKDIR /app

# Copy built application and dependencies from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy Prisma schema files (needed for runtime operations)
COPY --from=builder /app/prisma ./prisma

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3100

# Expose application port
EXPOSE 3100

# Run the application
CMD ["npm", "start"]

# docker build -t my_app_image .
