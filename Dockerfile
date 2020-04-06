# Install web app deps
# --------------------
FROM node:13.7-alpine AS app-deps

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY Makefile .

RUN apk update && \
    apk add make git bash && \
    make dependencies

COPY / .

# Build web app
# --------------------
FROM node:13.7-alpine AS app-builder

WORKDIR /app
COPY --from=app-deps /app /app

RUN apk update && \
    apk add make bash && \
    make build

# Build server
# --------------------
FROM nginx:1.17-alpine

COPY --from=app-builder /app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
