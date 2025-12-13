FROM node:24-alpine AS builder

WORKDIR /app

COPY ../package*.json ./

RUN npm ci --ignore-scripts

RUN npm prune --omit-dev

COPY ../ .

FROM node:24-alpine AS final

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app ./

COPY Docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN addgroup -S appgroup && adduser -S -G appgroup -h /home/appuser appuser && chown -R appuser:appgroup /app

ENTRYPOINT ["/entrypoint.sh"]

USER appuser

EXPOSE 5000

CMD ["npm", "run", "build"]