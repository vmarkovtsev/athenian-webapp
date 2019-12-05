# Build web app
# ----------------
FROM node:13.1-alpine AS app-builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY / .
RUN yarn build


# Build server
# ----------------
FROM nginx:1.17-alpine

COPY --from=app-builder /app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
