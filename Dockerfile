FROM node:19 AS base

RUN apt-get update -y & apt-get upgrade -y

RUN yarn set version stable
RUN yarn --version

WORKDIR /home/app

FROM base AS deps

COPY package.json .
COPY yarn.lock .
COPY server/package.json ./server/package.json
COPY client/app/package.json ./client/app/package.json

RUN yarn


From deps as dev-server

ARG API_PORT
ENV API_PORT=${API_PORT}

