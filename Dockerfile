FROM node:4.4.0
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install -g nodemon
RUN npm install

CMD ["npm", "start"]
