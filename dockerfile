# Stage 1: Build React frontend
FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Build backend and combine with frontend
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Install frontend dependencies (for serving)
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Copy backend source
COPY backend ./backend

# Install concurrently globally
RUN npm install -g concurrently

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV REACT_APP_API_URL=/api

# Expose ports (React + Express)
EXPOSE 3000 5000

# Run both servers using concurrently
CMD ["npm", "run", "start"]