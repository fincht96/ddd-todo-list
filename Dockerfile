FROM node:19-alpine AS base
ARG PORT
ENV PORT=${PORT}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN yarn policies set-version 3.5.1
RUN yarn --version
WORKDIR /home/app

FROM base AS deps
COPY . .
RUN yarn
EXPOSE 4000


From deps as dev
CMD ["yarn", "start:dev"]

From deps as prod
CMD ["yarn", "start:prod"]