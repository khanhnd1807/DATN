
FROM node:16.7.0

WORKDIR /app
# sap chép mọi tập tin để cho vào image
COPY *.json /app
COPY */*.d.ts /app
COPY . .
RUN npm install
RUN npm install -g typescript
RUN npm install -g sequelize-cli
RUN npm install -g nodemon
CMD ["npm","run","devdocker"] 
EXPOSE 6969



