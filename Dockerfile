FROM node:lts-slim AS base

FROM base AS deps

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget \
  gnupg \
  --no-install-recommends \
  nano \
  && rm -rf /var/lib/apt/lists/*

# Install Chromium manually
RUN apt-get update && apt-get install -y \
  chromium \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app/be

COPY package.json package-lock.json* ./

RUN npm install

FROM base AS builder

WORKDIR /app/be

COPY --from=deps /app/be/node_modules ./node_modules
COPY --from=deps /app/be/package-lock.json ./package-lock.json
COPY . .
COPY prisma ./prisma

ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y openssl

RUN npx prisma generate --schema=./prisma/schema.prisma

# FROM node:16.20.2-slim
# WORKDIR /app

# COPY --from=builder /app /app
# Set the Puppeteer executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]