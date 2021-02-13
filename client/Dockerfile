FROM node:14.15.0-alpine
WORKDIR /helpfood-ui/client

ENV PATH /client/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8080

CMD npm run dev