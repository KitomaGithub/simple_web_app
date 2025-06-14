FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install react-redux @reduxjs/toolkit react-persist

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm" , "run", "start"]