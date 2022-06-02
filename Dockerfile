FROM node:16.13.2

WORKDIR /usr/src/sos_app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 5000

CMD ["node", "dist/src/main"]