FROM node:current-alpine AS builder

# RUN apt-get update && apt-get install chromium-browser -y
# RUN apt-get update \
#     && apt-get -f install -y --no-install-recommends \
#         fonts-liberation \
#         libgtk-3-0 \
#         libwayland-client0 \
#         xdg-utils \
#         libu2f-udev \
#         libvulkan1 \
#         libnss3 \
#         libnspr4 \
#         libatk1.0-0 \
#         libatk-bridge2.0-0 \
#         libcups2 \
#         libdrm2 \
#         libxkbcommon0 \
#         libxcomposite1 \
#         libxdamage1 \
#         libxfixes3 \
#         libxrandr2 \
#         libgbm1 \
#         libasound2 \
#         openssl \
#         libssl-dev \
#     && rm -rf /var/lib/apt/lists/*

RUN apk update \
    && apk --no-cache add openssl

WORKDIR /app
COPY . .
RUN npm install

FROM node:current-alpine
WORKDIR /app/be
COPY --from=builder /app .

EXPOSE 3001
CMD ["npm", "run", "dev"]