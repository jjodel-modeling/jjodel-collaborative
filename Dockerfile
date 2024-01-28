FROM node:16-alpine

WORKDIR /app
COPY ./build .

EXPOSE 5001

CMD ["node", "main.bundle.js"]
