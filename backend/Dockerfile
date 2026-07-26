FROM node:22-alpine

WORKDIR /backend

COPY package*.json ./backend

RUN npm install

COPY . . ./backend

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]