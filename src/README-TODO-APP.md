# TODO App

TODO管理アプリケーション

## 前提条件

以下のツールがインストールされている必要があります：

- **Docker**: Docker DesktopまたはDocker Engine（Docker Composeを含む）
- **Node.js**: v20系（Voltaでバージョン管理、オプション）
- **yarn**: パッケージマネージャー（オプション - Docker Compose使用時は不要）

> **注意**: このプロジェクトはDocker Composeを使用したセットアップを前提としています。PostgreSQLのローカルインストールは不要です。

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd todo-app
```

### 2. 環境変数の設定

`src/`ディレクトリ内に`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/todo_app_dev
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

> **注意**: Docker Compose使用時は、`DATABASE_URL`のホスト部分を`db`（Docker Composeのサービス名）に設定してください。

### 3. Docker Composeでサービスを起動

```bash
# srcディレクトリに移動
cd src

# すべてのサービス（PostgreSQL、フロントエンド、バックエンド）を起動
docker-compose up -d

# ログを確認
docker-compose logs -f

# 特定のサービスのログのみ確認
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### 4. サービス状態の確認

```bash
# srcディレクトリで実行
cd src

# すべてのサービスの状態を確認
docker-compose ps

# サービスが正常に起動していることを確認
# 以下のサービスが "Up" 状態である必要があります：
# - todo-app-db (PostgreSQL)
# - todo-app-backend (NestJS)
# - todo-app-frontend (Nuxt.js)
```

### 5. データベースのセットアップ

```bash
# srcディレクトリで実行
cd src

# Prismaスキーマをデータベースに適用
docker-compose exec backend yarn prisma db push

# Prismaクライアントを生成
docker-compose exec backend yarn prisma generate
```

### 6. アクセステスト

- **フロントエンド**: http://localhost:3000 にアクセス可能
- **バックエンド**: http://localhost:3001 にアクセス可能

## セットアップ検証

セットアップが正常に完了したことを確認するには：

1. **Docker Composeサービスの起動確認**
   ```bash
   cd src
   docker-compose ps
   ```
   - すべてのサービス（db、backend、frontend）が "Up" 状態であることを確認

2. **フロントエンドアクセステスト**
   - http://localhost:3000 にアクセス可能であることを確認
   - エラーが発生しないことを確認

3. **バックエンドアクセステスト**
   - http://localhost:3001 にアクセス可能であることを確認
   - エラーが発生しないことを確認

4. **データベース接続テスト**

```bash
# srcディレクトリで実行
cd src

# データベース接続テストスクリプトを実行
docker-compose exec backend yarn test:db
```

**期待される結果**:
- ✅ データベース接続成功！
- ✅ クエリ実行成功
- ✅ データベース接続テスト完了

**エラーが発生した場合**:
- Docker Composeサービスが起動しているか確認（`cd src && docker-compose ps`）
- `.env`ファイルの`DATABASE_URL`が正しいか確認（Docker Compose使用時は`db`をホスト名に使用）
- コンテナのログを確認（`cd src && docker-compose logs backend`）

**Prisma Studioでデータベースを確認（オプション）**:
```bash
cd src
docker-compose exec backend yarn prisma studio
```
Prisma Studioがブラウザで起動し、データベースの内容を確認できます。

## Docker Composeコマンド

> **注意**: 以下のコマンドはすべて`src/`ディレクトリ内で実行してください。

### 基本的なコマンド

```bash
# srcディレクトリに移動
cd src

# すべてのサービスを起動（バックグラウンド）
docker-compose up -d

# すべてのサービスを起動（フォアグラウンド、ログ表示）
docker-compose up

# サービスを停止
docker-compose stop

# サービスを停止してコンテナを削除
docker-compose down

# サービスを停止してボリュームも削除（データベースデータも削除）
docker-compose down -v

# ログを確認
docker-compose logs -f

# 特定のサービスのログを確認
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# コンテナ内でコマンドを実行
docker-compose exec backend yarn prisma db push
docker-compose exec backend yarn test:db
docker-compose exec frontend yarn build
```

### データベースのみ起動する場合

フロントエンドとバックエンドをローカルで実行する場合：

```bash
# srcディレクトリで実行
cd src

# データベースのみ起動
docker-compose up -d db

# .envファイルでDATABASE_URLをlocalhostに設定
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todo_app_dev
```

## トラブルシューティング

### ポートが既に使用されている場合

```bash
# ポートを使用しているプロセスを確認
# Linux/macOS
lsof -i :3000
lsof -i :3001
lsof -i :5432

# ポートを変更する場合、docker-compose.ymlを編集
```

### データベース接続エラー

- Docker Composeサービスが起動しているか確認（`cd src && docker-compose ps`）
- `.env`の`DATABASE_URL`が正しいか確認（Docker Compose使用時は`db`をホスト名に使用）
- データベースコンテナのログを確認（`cd src && docker-compose logs db`）

### コンテナの再ビルドが必要な場合

```bash
# srcディレクトリで実行
cd src

# イメージを再ビルド
docker-compose build

# キャッシュを使わずに再ビルド
docker-compose build --no-cache

# 再ビルドして起動
docker-compose up -d --build
```

### 依存関係のインストールエラー

```bash
# srcディレクトリで実行
cd src

# コンテナ内で依存関係を再インストール
docker-compose exec backend yarn install
docker-compose exec frontend yarn install
```

## プロジェクト構造

```
todo-app/
├── src/
│   ├── frontend/      # Nuxt.jsアプリケーション
│   ├── backend/       # NestJSアプリケーション
│   └── shared/        # 共通ライブラリ
└── specs/             # 仕様書
```

## 技術スタック

- **フロントエンド**: Nuxt.js (Vue 3), TypeScript
- **バックエンド**: NestJS, TypeScript, Node.js v20
- **データベース**: PostgreSQL, Prisma ORM
- **認証**: JWT, bcrypt
- **パッケージマネージャー**: yarn
- **開発ツール**: ESLint, Prettier

