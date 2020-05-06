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
# -------------
FROM app-deps AS app-builder

ARG release
ENV release=$release

WORKDIR /app

RUN RELEASE=${release} make build

# Build web app Sentry releaser
# -----------------------------
FROM app-builder AS app-sentry-releaser

WORKDIR /app

RUN apk --no-cache add curl
RUN curl -sL https://sentry.io/get-cli/ | bash

CMD ["make", "sentry-release"]


# Build server
# --------------------
FROM nginx:1.17-alpine

COPY --from=app-builder /app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
