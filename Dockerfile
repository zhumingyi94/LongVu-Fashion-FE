# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Install dependencies for sharp (for image processing)
RUN apk add --no-cache vips-dev

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for backend URL
ENV BACKEND_URL=http://host.docker.internal:8080

# Expose the port the app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]