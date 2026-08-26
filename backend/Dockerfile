FROM node:22-alpine

WORKDIR /backend

# .npmrc avant npm install : legacy-peer-deps (webp-convertor vs multi-select)
COPY package*.json .npmrc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]