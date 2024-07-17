FROM nginx:latest

# Set the working directory
WORKDIR /usr/local/app

# Add the build code to app
COPY ./dist/almuerzos-gratis/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80
