# Use official Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package.json files first
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 5000 (used by backend server)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
