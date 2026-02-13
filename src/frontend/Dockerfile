# フロントエンド用Dockerfile（開発用）
FROM node:20.20.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージマネージャーとしてyarnを使用
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# package.jsonをコピー（依存関係のインストールを最適化）
COPY package.json ./

# 依存関係をインストール
RUN yarn install

# アプリケーションコードをコピー
COPY . .

# 開発サーバーのポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["yarn", "dev"]

