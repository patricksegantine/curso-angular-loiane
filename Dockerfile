FROM node:10.13-alpine as build
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
VOLUME /var/cache/nginx
COPY --from=build /app/dist/public .
COPY ./.docker/config/nginx.conf /etc/nginx/conf.d/default.conf


# nginx.conf sample in https://github.com/DanWahlin/Angular-Core-Concepts

# docker build -t curso-angular
# docker run -p 8081:80 curso-angular
