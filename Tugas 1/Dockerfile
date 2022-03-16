FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY models/ ./
COPY util/ ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 27132
CMD [ "node", "app.js" ]