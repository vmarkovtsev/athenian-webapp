FROM nginx:1.17-alpine

RUN echo "<h1>athenian.co</h1>" > /usr/share/nginx/html/index.html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
