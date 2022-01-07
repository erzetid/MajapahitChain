FROM node:lts-alpine
ADD . /app
WORKDIR /app

CMD npm run repl