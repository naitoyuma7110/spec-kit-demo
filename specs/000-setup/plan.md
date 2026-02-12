# Implementation Plan: プロジェクトセットアップ

**Branch**: `000-setup` | **Date**: 2026-02-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/000-setup/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

プロジェクトの開発環境、依存関係、データベース、開発サーバー、プロジェクト構造をセットアップする。Nuxt.js（フロントエンド）とNestJS（バックエンド）を使用したWebアプリケーションの初期セットアップを実装する。

## Technical Context

**Language/Version**: TypeScript (strict mode), Node.js v20系（Voltaでバージョン管理）

**Primary Dependencies**: 
- フロントエンド: Nuxt.js (Vue 3), TypeScript
- バックエンド: NestJS, TypeScript
- データベース: PostgreSQL, Prisma ORM
- 認証: JWT, bcrypt
- パッケージマネージャー: yarn
- 開発ツール: ESLint, Prettier

**Storage**: PostgreSQL (開発環境: todo_app_dev, ユーザー: postgres, ホスト: localhost, ポート: 5432)

**Testing**: [未定義 - 必要に応じて追加。Constitution準拠でTDD必須]

**Target Platform**: Webブラウザ（開発環境: ローカル開発サーバー）

**Project Type**: web（フロントエンド + バックエンド）

**Performance Goals**: セットアップ完了後、開発サーバーが正常に起動し、エラーが発生しない（SC-003）

**Constraints**: 
- OSSを優先し、依存ライブラリは最小限（Constitution準拠）
- 初期実装はシンプルさ優先（Constitution準拠）
- 複数OS対応（Windows、macOS、Linux）

**Scale/Scope**: 
- 開発者1名以上がセットアップ可能
- 90%の開発者が30分以内にセットアップ完了（SC-001）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Library-First Principle
- ✅ **Pass**: セットアップ段階ではライブラリ設計は不要。プロジェクト構造の初期化のみ。

### II. Test-First（非交渉）
- ✅ **Pass**: セットアップ検証は開発サーバー起動確認とデータベース接続テストで実施（FR-009）。

### III. Integration Testing
- ✅ **Pass**: セットアップ検証で統合テスト環境の準備を確認。

### IV. Observability & Simplicity
- ✅ **Pass**: シンプルなセットアップ手順を提供。エラーメッセージは明確に表示。

**Gate Status**: ✅ **ALL GATES PASSED**

## Project Structure

### Documentation (this feature)

```text
specs/000-setup/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command) - セットアップでは不要の可能性
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command) - セットアップでは不要の可能性
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── backend/
│   ├── src/
│   │   ├── main.ts          # NestJSエントリーポイント
│   │   ├── app.module.ts    # ルートモジュール
│   │   └── prisma/
│   │       └── schema.prisma # Prismaスキーマ
│   ├── Dockerfile           # バックエンド用Dockerfile（開発用）
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   ├── .prettierrc
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── app.vue          # Nuxt.jsルートコンポーネント
│   │   ├── pages/
│   │   ├── components/
│   │   └── composables/
│   ├── Dockerfile           # フロントエンド用Dockerfile（開発用）
│   ├── nuxt.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   ├── .prettierrc
│   └── tests/
│
└── shared/                   # 共通ライブラリ（必要に応じて）
    └── [将来の共通ライブラリ]

specs/                    # 仕様書
├── 000-setup/
└── 001-todo-management/

README.md                 # セットアップ手順を含む
.env.example              # 環境変数テンプレート
.gitignore
src/
├── docker-compose.yml     # Docker Compose設定（PostgreSQL、フロントエンド、バックエンド）
└── .env                  # 環境変数（.gitignoreに含まれる）
# Volta設定は各package.json内にvoltaフィールドとして定義（src/frontend/package.json、src/backend/package.json）
.dockerignore             # Dockerビルドから除外するファイル
```

**Structure Decision**: Web application構造を採用（Option 2）。フロントエンド（Nuxt.js）とバックエンド（NestJS）を`src/`配下に配置し、将来的に共通ライブラリを配置する`src/shared/`ディレクトリも準備する。

**セットアップ方法**: プロジェクトのセットアップはDocker Composeを使用して実行する。これにより、PostgreSQLのローカルインストールが不要となり、開発環境の一貫性を確保できる。詳細は「Phase 1: Design & Contracts」セクションの「セットアップ方法」を参照。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

（セットアップ段階では憲法違反なし）

## Phase 0: Outline & Research

### Research Tasks

セットアップ仕様は既に明確化されているため、追加のリサーチは不要。以下の技術選択は既に確定：

- **パッケージマネージャー**: yarn（clarificationで決定）
- **開発サーバーポート**: フロントエンド 3000、バックエンド 3001（clarificationで決定）
- **データベース設定**: todo_app_dev/postgres/localhost:5432（clarificationで決定）
- **環境変数**: DATABASE_URL、JWT_SECRET、NODE_ENV（clarificationで決定）

### Research Findings

**Decision**: 技術スタック定義（plan.mdのTechnical Context）とclarification結果を採用。

**Rationale**: 
- 技術スタックは既に定義済み（Nuxt.js、NestJS、PostgreSQL、Prisma）
- セットアップの詳細はclarificationで明確化済み
- 追加のリサーチは不要

**Alternatives considered**: なし（既に決定済み）

## Phase 1: Design & Contracts

### Data Model

セットアップ段階ではデータモデルは不要。データモデルは機能実装時（001-todo-managementなど）に定義される。

### API Contracts

セットアップ段階ではAPI契約は不要。API契約は機能実装時（001-todo-managementなど）に定義される。

### Quickstart Guide

セットアップ完了後の検証手順を定義：

#### Docker Composeを使用する場合

1. **すべてのサービスを起動**
   ```bash
   docker-compose up -d
   ```

2. **サービス状態の確認**
   ```bash
   docker-compose ps
   ```

3. **ログの確認**
   ```bash
   docker-compose logs -f
   ```

4. **アクセステスト**
   - フロントエンド: http://localhost:3000 にアクセス可能
   - バックエンド: http://localhost:3001 にアクセス可能
   - データベース: コンテナ内のPostgreSQLに接続可能

5. **データベース接続テスト**
   ```bash
   docker-compose exec backend yarn test:db
   ```

### セットアップ方法

プロジェクトのセットアップはDocker Composeを使用して実行する：

**利点**:
- PostgreSQLのローカルインストールが不要
- 開発環境の一貫性を確保
- セットアップ時間の短縮
- 複数の開発者が同じ環境で作業可能

**構成**:
- **PostgreSQL**: Docker Composeで起動（ポート5432）
- **フロントエンド**: 開発サーバーをDockerコンテナで実行（ポート3000）
- **バックエンド**: 開発サーバーをDockerコンテナで実行（ポート3001）

**必要なファイル**:
- `src/docker-compose.yml`: サービス定義（PostgreSQL、フロントエンド、バックエンド）
- `.dockerignore`: Dockerビルドから除外するファイル（プロジェクトルート）
- `src/frontend/Dockerfile`: フロントエンド用のDockerfile（開発用）
- `src/backend/Dockerfile`: バックエンド用のDockerfile（開発用）
- `src/frontend/package.json`: Volta設定（voltaフィールド）を含む
- `src/backend/package.json`: Volta設定（voltaフィールド）を含む

**起動方法**:
```bash
# srcディレクトリに移動
cd src

# すべてのサービスを起動
docker-compose up -d

# ログを確認
docker-compose logs -f

# サービスを停止
docker-compose down

# データベースのみ起動（フロントエンド・バックエンドをローカルで実行する場合）
docker-compose up -d db
```

**環境変数の設定**:
- `src/.env`ファイルに`DATABASE_URL`を設定（Docker Compose内のPostgreSQLに接続）
- Docker Compose使用時: `DATABASE_URL=postgresql://postgres:postgres@db:5432/todo_app_dev`
- ローカル実行時: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todo_app_dev`
