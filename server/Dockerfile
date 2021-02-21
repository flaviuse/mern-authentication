# Create image based on the official Node 6 image from the dockerhub
FROM node:15.9.0-alpine3.13 
# Change directory so that our commands run inside this new directory
WORKDIR /app
# Copy dependency definitions
COPY package.json ./
COPY yarn.lock ./

# Install dependecies
RUN yarn
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 8081
# Serve the app
CMD ["yarn", "dev"]