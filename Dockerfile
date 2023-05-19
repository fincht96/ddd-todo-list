FROM node:19 AS base

RUN apt-get update -y & apt-get upgrade -y

RUN yarn set-version 3.5.1
RUN yarn --version

WORKDIR /home/app

FROM base AS deps

COPY package.json .
COPY yarn.lock .

RUN yarn

From deps as dev
ARG PORT
ENV PORT=${PORT}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}


From deps as prod
ARG PORT
ENV PORT=${PORT}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}






# for prod 