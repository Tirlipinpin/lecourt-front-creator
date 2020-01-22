FROM node:lts-alpine as base
WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

ENTRYPOINT [ "npm" ]
CMD [ "start" ]

EXPOSE 3000

FROM nginx:stable-alpine as runtime

COPY --from=base /app/build /usr/share/nginx/lecourt
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/lecourt.conf

EXPOSE 80
