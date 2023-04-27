FROM node:18-alpine

RUN mkdir -p /usr/src/app

RUN chmod -R 777 /usr/src/app

WORKDIR /usr/src/app

RUN mkdir csvs

ARG PORT

EXPOSE ${PORT}

RUN apk add yarn

COPY package.json yarn.lock ./

RUN yarn install

COPY server ./server/

COPY config ./config/

COPY handlers ./handlers/

COPY middlewares ./middlewares/

CMD ["node", "server/server.js"]
