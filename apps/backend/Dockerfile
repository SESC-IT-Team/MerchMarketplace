FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
COPY --from=build /app/.medusa/server ./
RUN npm ci --omit=dev
EXPOSE 9000
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]