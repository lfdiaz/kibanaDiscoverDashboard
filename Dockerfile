FROM node:16-slim

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

COPY ./client/package.json client/
COPY ./client/yarn.lock client/

COPY ./server/package.json server/
COPY ./server/yarn.lock server/

RUN yarn install

COPY ./server server
COPY ./client client

EXPOSE 8080

CMD [ "yarn", "start"]