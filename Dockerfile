# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining files into the container
COPY . .

# Expose port 3000 for incoming connections
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
