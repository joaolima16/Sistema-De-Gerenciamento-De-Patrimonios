FROM node:18-alpine

EXPOSE 3000

COPY .  /opt/app

WORKDIR /opt/app

RUN printf "SECRET=thisismysecret" >> .env

RUN printf "SECRET=" >> .env.example

RUN npm update

RUN npm install

RUN apk add python3

RUN apk add py3-pip

RUN apk add py3-pyzbar

RUN apk add openjdk17

RUN npm run install_python

CMD npm start
