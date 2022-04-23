# pull official base image
FROM node:16.14.2-alpine3.15

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
