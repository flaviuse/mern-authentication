# build environment
FROM node:16.16-alpine3.16 as build

ARG NODE_ENV_ARG
ARG REACT_APP_API_URL_ARG
ENV NODE_ENV=$NODE_ENV_ARG
ENV REACT_APP_API_URL=$REACT_APP_API_URL_ARG

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# production environment, nginx serving static files from build directory
FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
