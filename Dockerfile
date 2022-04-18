FROM node:14.19.0-alpine

WORKDIR ./

COPY ./package.json .
COPY ./tsconfig.build.json .

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN npm install
RUN npm i -g @nestjs/cli
RUN npm i -g cross-env
RUN npm i typeorm
RUN npm i -g ts-node
RUN npm run build

COPY ./ .

EXPOSE 5000
