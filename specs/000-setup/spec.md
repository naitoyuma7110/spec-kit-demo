# Feature Specification: プロジェクトセットアップ

**Feature Branch**: `000-setup`
**Created**: 2026-02-12
**Status**: Draft
**Input**: User description: "Set up project infrastructure including development environment setup, dependency installation, database configuration, development server setup, and initial project structure"

## Clarifications

### Session 2026-02-12

- Q: プロジェクトで使用するパッケージマネージャーはどれか？（npm/yarn/pnpm） → A: yarn
- Q: 開発サーバーのポート番号はどれか？ → A: フロントエンド 3000、バックエンド 3001
- Q: データベース接続設定のデフォルト値はどれか？ → A: データベース名 todo_app_dev、ユーザー名 postgres、パスワード postgres、ホスト localhost、ポート 5432
- Q: 開発環境で必要な環境変数はどれか？ → A: DATABASE_URL、JWT_SECRET、NODE_ENV
- Q: セットアップが成功したことを検証する方法はどれか？ → A: 開発サーバー起動確認とデータベース接続テスト

※本Featureの共通設計・技術スタック・非機能要件・アーキテクチャ等は以下を参照：

- `.specify/memory/constitution.md` - プロジェクトの原則と制約
- `plan.md` - 実装計画（技術スタック・アーキテクチャの詳細を含む）

## User Scenarios & Testing _(mandatory)_

### User Story 1 - 開発環境のセットアップ (Priority: P1)

開発者は必要なツールと依存関係をインストールし、開発環境を準備できる。

**Why this priority**: 開発環境のセットアップは、すべての開発作業の前提条件である。これが完了しなければ、他の機能を実装できない。

**Independent Test**: 開発者はREADMEに記載された手順に従って、必要なツールをインストールし、プロジェクトをクローンして依存関係をインストールできる。このセットアップは独立してテスト可能であり、開発を開始するための基本的な価値を提供する。

**Acceptance Scenarios**:

1. **Given** 開発者が新しいマシンで作業を開始する、**When** READMEのセットアップ手順に従う、**Then** 必要なツール（Node.js、Volta、PostgreSQLなど）がインストールされ、プロジェクトが動作する
2. **Given** 開発者がプロジェクトをクローンする、**When** 依存関係をインストールする、**Then** すべての依存関係が正常にインストールされ、エラーが発生しない
3. **Given** 開発者がセットアップを完了する、**When** 開発サーバーを起動する、**Then** フロントエンドとバックエンドの開発サーバーが正常に起動する

---

### User Story 2 - データベースのセットアップ (Priority: P2)

開発者はPostgreSQLデータベースをセットアップし、Prismaスキーマを適用できる。

**Why this priority**: データベースはアプリケーションのデータ永続化に必要である。セットアップが完了すれば、データモデルの実装を開始できる。

**Independent Test**: 開発者はPostgreSQLをインストールし、データベースを作成し、Prismaマイグレーションを実行できる。このセットアップは独立してテスト可能であり、データベース機能の実装を可能にする。

**Acceptance Scenarios**:

1. **Given** PostgreSQLがインストールされている、**When** データベースを作成し、Prismaマイグレーションを実行する、**Then** データベーススキーマが正常に適用される
2. **Given** データベースがセットアップされている、**When** Prismaクライアントを生成する、**Then** 型安全なデータベースクライアントが生成される
3. **Given** データベースがセットアップされている、**When** 接続をテストする、**Then** アプリケーションからデータベースに正常に接続できる

---

### User Story 3 - プロジェクト構造の初期化 (Priority: P3)

開発者はプロジェクトのディレクトリ構造を作成し、基本的な設定ファイルを配置できる。

**Why this priority**: プロジェクト構造は、コードの組織化と保守性に重要である。適切な構造が確立されれば、機能開発を効率的に進められる。

**Independent Test**: 開発者はプロジェクトのディレクトリ構造を作成し、基本的な設定ファイル（package.json、tsconfig.json、.env.exampleなど）を配置できる。このセットアップは独立してテスト可能であり、プロジェクトの基盤を提供する。

**Acceptance Scenarios**:

1. **Given** プロジェクトが初期化される、**When** ディレクトリ構造を作成する、**Then** frontend/、backend/、shared/などのディレクトリが作成される
2. **Given** プロジェクト構造が作成される、**When** 設定ファイルを配置する、**Then** 各フレームワークに必要な設定ファイルが適切な場所に配置される
3. **Given** プロジェクト構造が完成する、**When** 開発サーバーを起動する、**Then** プロジェクトが正常に動作する

---

### Edge Cases

- **既存のツールがインストールされている場合**: 既にNode.jsやPostgreSQLがインストールされている場合、バージョンが要件と一致するか確認し、必要に応じてアップグレードまたはダウングレードする
- **異なるOS環境**: Windows、macOS、Linuxで異なるセットアップ手順が必要な場合、各OS用の手順を提供する
- **ネットワークエラー**: 依存関係のインストール中にネットワークエラーが発生した場合、適切なエラーメッセージを表示し、再試行方法を提供する
- **権限エラー**: データベースの作成やファイルの書き込みで権限エラーが発生した場合、解決方法を提供する
- **ポートの競合**: 開発サーバーやデータベースのポートが既に使用されている場合、代替ポートを使用するか、競合を解決する方法を提供する

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide clear setup instructions in README.md
- **FR-002**: System MUST support installation of required tools (Node.js v20, Volta, PostgreSQL)
- **FR-003**: System MUST support dependency installation via yarn package manager
- **FR-004**: System MUST provide database setup instructions and migration scripts with default connection settings (database: todo_app_dev, user: postgres, password: postgres, host: localhost, port: 5432)
- **FR-005**: System MUST provide environment variable configuration template (.env.example) with required variables: DATABASE_URL, JWT_SECRET, NODE_ENV
- **FR-006**: System MUST support development server startup for both frontend (port 3000) and backend (port 3001)
- **FR-007**: System MUST provide project directory structure following plan.md (Web application structure: frontend/ + backend/)
- **FR-008**: System MUST support code quality tools setup (ESLint, Prettier)
- **FR-009**: System MUST provide validation that setup was successful through development server startup verification and database connection testing
- **FR-010**: System MUST support setup on multiple operating systems (Windows, macOS, Linux)

### Key Entities _(include if feature involves data)_

- **開発環境**: 開発に必要なツールと設定
  - Node.js: v20系
  - Volta: バージョン管理
  - PostgreSQL: データベース
  - その他の開発ツール

- **プロジェクト構造**: ディレクトリとファイルの組織
  - frontend/: Nuxt.jsアプリケーション
  - backend/: NestJSアプリケーション
  - shared/: 共通ライブラリ
  - specs/: 仕様書

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 90%の開発者がREADMEの手順に従って、30分以内に開発環境をセットアップできる
- **SC-002**: 100%のセットアップ手順が明確に文書化され、エラーが発生した場合の解決方法が提供される
- **SC-003**: セットアップ完了後、開発サーバーが正常に起動し、エラーが発生しない
- **SC-004**: すべての主要なOS（Windows、macOS、Linux）でセットアップが可能である
- **SC-005**: セットアップ手順に従った開発者が、最初の機能開発を開始できる状態になる
