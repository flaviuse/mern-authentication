# pull official base image
FROM node:14.16.0-alpine3.13

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn ci 
# add app
COPY . ./

# start app
CMD ["yarn", "start"]
