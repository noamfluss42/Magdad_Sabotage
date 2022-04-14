FROM bitnami/node:17-debian-10
WORKDIR /app
COPY . .
RUN npm i
RUN ng build

FROM nginx:1.17.1-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY /dist/frontend /usr/share/nginx/html
EXPOSE 4200


