FROM node:13.13.0-alpine3.11
WORKDIR /home/node/app
RUN apk update && apk add git python3 make g++
COPY package.json yarn.lock ./
RUN yarn --quiet
