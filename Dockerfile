FROM node:16.13.2

WORKDIR /usr/src/library_app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 5000

CMD ["node", "dist/src/main"]