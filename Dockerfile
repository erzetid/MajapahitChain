FROM node:lts-alpine
ADD . /app
WORKDIR /app

CMD npm run repl

# FROM node:lts-alpine

# # RUN apk update && apk add ca-certificates openssl && update-ca-certificates
# RUN apk update && apk add --no-cache pkgconfig openssl-dev ca-certificates linux-headers && update-ca-certificates
# RUN mkdir /app
# ADD . /app
# WORKDIR /app

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
# RUN chmod +x /wait

# RUN npm install --save
# CMD /wait && npm run start-dev