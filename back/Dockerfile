FROM node:16

WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app

RUN npm run build --prod

CMD ["sh", "-c", "npm run start:prod"]
