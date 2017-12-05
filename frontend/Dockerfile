FROM node:latest
RUN npm install -g  pushstate-server
RUN mkdir -p /app/build/v1/static/{css,js,media}
COPY build/ /app/build/
COPY build/static/css /app/build/v1/static/css
COPY build/static/js /app/build/v1/static/js
WORKDIR /app
ENTRYPOINT ["pushstate-server", "build"]
