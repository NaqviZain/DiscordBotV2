FROM node:20-alpine

WORKDIR C:\Users\Server\Documents\GitHub\centrevillebot_njs

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["node", "index.js"]