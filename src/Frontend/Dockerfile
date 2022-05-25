FROM bitnami/nginx:latest

USER root

RUN  apt-get update && apt-get install gettext-base
COPY nginx.conf /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf
COPY /dist/frontend /app

# RUN echo "API_URL:" $API_URL
RUN chmod -R 777 ./assets

USER 1001

EXPOSE 12581
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /app/assets/env.sample.js > /app/assets/env.js && exec nginx -g 'daemon off;'"]
