FROM node:lts-alpine as builder
WORKDIR /app

COPY . /app

RUN npm i
RUN npm run build

FROM nginx:stable-alpine as runtime

COPY --from=builder /app/build /usr/share/nginx/lecourt
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/lecourt.conf

EXPOSE 80
