FROM node:20

COPY package.json .

RUN npm install 

# ...
RUN apt-get update && apt-get install -y default-mysql-client
# ...

COPY . .

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

