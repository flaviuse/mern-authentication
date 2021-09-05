# pull official base image
FROM node:14.16.0-alpine3.13

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn ci 
# add app
COPY . ./

# start app
CMD ["yarn", "start"]
