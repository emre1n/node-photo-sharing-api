FROM node:18-alpine

WORKDIR /usr/src/app

# Add postgresql-client for potential debugging
RUN apk add --no-cache postgresql-client

COPY package*.json ./

RUN npm install

COPY . .

# Create logs directory and set permissions
RUN mkdir -p src/logs && \
    chmod -R 777 src/logs

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"] 