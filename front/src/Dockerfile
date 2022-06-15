### NG BUILD
FROM node:16 AS build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .

RUN npm install
RUN npm run build --prod

# STAGE 2: RUN
FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/front-end /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
EXPOSE 80
