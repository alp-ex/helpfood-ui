FROM node:14.15.0-alpine
WORKDIR /helpfood-ui
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD yarn dev