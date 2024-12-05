FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV HOST 0.0.0.0

EXPOSE 8080

CMD ["npm", "start"]