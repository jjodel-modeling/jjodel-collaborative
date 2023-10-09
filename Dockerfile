FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "prod"]
