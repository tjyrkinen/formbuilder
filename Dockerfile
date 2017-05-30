FROM node:7

ENV APP_PATH /opt/app

RUN mkdir -p $APP_PATH

WORKDIR $APP_PATH

COPY package.json $APP_PATH/package.json

RUN yarn install

COPY . $APP_PATH

CMD npm run start
