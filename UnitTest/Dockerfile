FROM cypress/base:latest
RUN mkdir -p /app/cypress
WORKDIR /app/cypress
COPY . /app/cypress
RUN npm install
RUN $(npm bin)/cypress verify
RUN ["npm", "run", "cy:run"]