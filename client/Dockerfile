# pull official base image
FROM node:15.9.0-alpine3.13 
# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# add app
COPY . ./

# start app
CMD ["yarn", "start"]
