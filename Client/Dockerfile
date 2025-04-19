# Step 1: Build the React app
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Remove default NGINX config and use custom one if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
