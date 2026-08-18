FROM node:24-bookworm-slim

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/package.json

RUN pnpm install --filter @3dpc/server...

COPY server ./server

WORKDIR /app/server

RUN pnpm build

CMD ["pnpm", "start"]