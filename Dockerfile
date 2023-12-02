FROM node:16-alpine

WORKDIR /app
COPY ./dist .

EXPOSE 5001

CMD ["node", "main.bundle.js"]
