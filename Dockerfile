FROM node:12.18.4-alpine
WORKDIR /helpfood-ui
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD yarn dev