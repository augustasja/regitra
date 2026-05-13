# Use modern Node
FROM node:22-alpine

# Enable pnpm
RUN corepack enable

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install deps
RUN pnpm install --frozen-lockfile

# Copy app
COPY . .

# Build the app
RUN pnpm build

# Expose Vite preview port
EXPOSE 4173

# Run Vite preview server
CMD ["pnpm", "preview", "--host", "0.0.0.0"]