FROM node:22-alpine AS builder

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

# Nécessaire pour injecter le hero LCP dans index.html au build
ARG VITE_STRAPI_URL
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL

RUN npm run build

FROM nginx:alpine

COPY --from=builder /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
