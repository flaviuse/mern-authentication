# Create image based on the official Node 6 image from the dockerhub
FROM node:13.12.0-alpine
# Change directory so that our commands run inside this new directory
WORKDIR /app
# Copy dependency definitions
COPY package*.json ./
# Install dependecies
RUN npm install --silent
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 8081
# Serve the app
CMD ["npm", "run", "dev"]