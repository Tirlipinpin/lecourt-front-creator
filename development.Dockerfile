FROM node:lts-alpine as runtime
WORKDIR /app

COPY . /app
RUN npm i

ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000
