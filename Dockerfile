FROM nginx:alpine

# Serve static files
COPY . /usr/share/nginx/html

# Proper MIME types + caching for PWA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
