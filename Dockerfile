FROM node:18
WORKDIR /usr/repos/clean-tdd-finances
COPY ./package.json  .
RUN npm install --only=prod