FROM node:latest

workdir /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "start"]

