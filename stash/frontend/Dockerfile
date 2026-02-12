
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
# 必要に応じて環境変数を明示
# ENV BASE_URL=http://localhost:3000
# ENV BACKEND_URL=http://localhost:3001
CMD ["yarn", "dev"]
