FROM node:22
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN npx prisma generate
EXPOSE 3001
CMD ["yarn", "start:prod"]
