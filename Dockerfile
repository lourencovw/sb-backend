FROM node:14.19.0-alpine

WORKDIR ./

COPY ./package.json .
COPY ./tsconfig.build.json .

RUN npm install
RUN npm i -g @nestjs/cli
RUN npm i -g cross-env
RUN npm i typeorm
RUN npm i -g ts-node
RUN npm run build

COPY ./ .

EXPOSE 5000

CMD npm run migration:run && npm start