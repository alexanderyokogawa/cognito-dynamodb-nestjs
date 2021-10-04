FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./dist .
COPY .env .

EXPOSE 8080

CMD [ "node", "main.js" ]
