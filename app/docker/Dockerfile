FROM node:lts-alpine

# RUN apk update && apk add ca-certificates openssl && update-ca-certificates
RUN apk update && apk add --no-cache pkgconfig openssl-dev ca-certificates linux-headers && update-ca-certificates
RUN mkdir /app
ADD . /app
WORKDIR /app

RUN npm install --save
CMD /wait && npm run start-dev