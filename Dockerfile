FROM node:20-alpine

# change directory of this file for build and to properly get WORKDIRECTORY
WORKDIR C:\Users\Server\Documents\GitHub\centrevillebot_njs

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["node", "index.js"]