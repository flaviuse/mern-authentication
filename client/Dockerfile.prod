# build environment
FROM node:16.14.2-alpine3.15 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn ci
COPY . ./
RUN yarn build

# production environment, nginx serving static files from build directory
FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
