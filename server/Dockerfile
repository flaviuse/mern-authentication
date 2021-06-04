# Create image based on node alpine
FROM node:14.16.0-alpine3.13
# Change directory so that our commands run inside this new directory
WORKDIR /app
# Copy dependency definitions
COPY package.json ./
COPY yarn.lock ./
# Install dependecies
RUN yarn ci
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 8081
# Serve the app
CMD ["yarn", "dev"]