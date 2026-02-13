# Tasks: プロジェクトセットアップ

**入力**: `/specs/000-setup/` の設計ドキュメント
**前提条件**: plan.md（必須）、spec.md（ユーザーストーリー用に必須）、research.md、data-model.md、contracts/

**テスト**: セットアップ段階（000-setup）では、テストは不要です。プロジェクトのセットアップとインフラストラクチャの準備に焦点を当て、実装コードが存在しないためテストタスクは含まれていません。機能実装段階（001以降）では、実装とセットでテストも作成します（Constitution準拠）。

**組織**: タスクはユーザーストーリーごとにグループ化され、各ストーリーを独立して実装・テストできるようにしています。

## フォーマット: `[ID] [P?] [Story] 説明`

- **[P]**: 並列実行可能（異なるファイル、依存関係なし）
- **[Story]**: このタスクが属するユーザーストーリー（例: US1, US2, US3）
- 説明には正確なファイルパスを含める

## パス規則

- **Webアプリ**: `src/backend/src/`, `src/frontend/src/`（plan.mdの構造に準拠）

## Phase 1: セットアップ（共有インフラストラクチャ）

**目的**: プロジェクトの初期化と基本構造の作成

- [ ] T001 プロジェクトルートディレクトリ構造を作成（src/frontend/, src/backend/, src/shared/, specs/）
- [ ] T002 [P] リポジトリルートにセットアップ手順を含むREADME.mdを作成
- [ ] T003 [P] リポジトリルートに.gitignoreファイルを作成
- [ ] T004 [P] src/frontend/package.jsonとsrc/backend/package.jsonにVolta設定（voltaフィールド）を追加
- [ ] T005 [P] リポジトリルートにDATABASE_URL、JWT_SECRET、NODE_ENVを含む.env.exampleテンプレートを作成

---

## Phase 2: 基盤（ブロッキング前提条件）

**目的**: すべてのユーザーストーリーを実装する前に完了しなければならないコアインフラストラクチャ

**⚠️ 重要**: このフェーズが完了するまで、ユーザーストーリーの作業を開始できません

- [ ] T006 フロントエンドプロジェクト構造を初期化（Nuxt.jsスキャフォールドを含むsrc/frontend/ディレクトリ）
- [ ] T007 バックエンドプロジェクト構造を初期化（NestJSスキャフォールドを含むsrc/backend/ディレクトリ）
- [ ] T008 [P] Nuxt.jsとTypeScriptの依存関係を含むsrc/frontend/package.jsonを作成
- [ ] T009 [P] NestJSとTypeScriptの依存関係を含むsrc/backend/package.jsonを作成
- [ ] T010 [P] 厳密モードでsrc/frontend/tsconfig.jsonを設定
- [ ] T011 [P] 厳密モードでsrc/backend/tsconfig.jsonを設定
- [ ] T012 [P] フロントエンド用のESLint設定をセットアップ（src/frontend/.eslintrc.js）
- [ ] T013 [P] バックエンド用のESLint設定をセットアップ（src/backend/.eslintrc.js）
- [ ] T014 [P] フロントエンド用のPrettier設定をセットアップ（src/frontend/.prettierrc）
- [ ] T015 [P] バックエンド用のPrettier設定をセットアップ（src/backend/.prettierrc）

**チェックポイント**: 基盤準備完了 - ユーザーストーリーの実装を並列で開始可能

---

## Phase 3: User Story 1 - 開発環境のセットアップ (Priority: P1) 🎯 MVP

**Goal**: 開発者はDocker Composeを使用して開発環境を準備できる。

**Independent Test**: 開発者はREADMEに記載された手順に従って、Docker Composeを使用してすべてのサービスを起動できる。セットアップ完了後、フロントエンドとバックエンドの開発サーバーが正常に起動する。

### User Story 1の実装

- [ ] T016 [US1] Docker Compose設定ファイル（src/docker-compose.yml）を作成（PostgreSQL、フロントエンド、バックエンドサービス）
- [ ] T017 [US1] .dockerignoreファイルを作成（Dockerビルドから除外するファイルを定義）
- [ ] T018 [US1] フロントエンド用のDockerfileを作成（src/frontend/Dockerfile - 開発用）
- [ ] T019 [US1] バックエンド用のDockerfileを作成（src/backend/Dockerfile - 開発用）
- [ ] T020 [US1] README.mdにDocker Composeを使用したセットアップ手順を記述
- [ ] T021 [US1] README.mdにDocker Composeコマンド（起動、停止、ログ確認）を記述
- [ ] T022 [US1] 環境変数の設定方法をREADME.mdに記述（.envファイル、DATABASE_URLの設定）

**チェックポイント**: この時点で、User Story 1は完全に機能し、独立してテスト可能である必要があります - 開発者はDocker Composeを使用してすべてのサービスを起動できます

---

## Phase 4: User Story 2 - データベースのセットアップ (Priority: P2)

**Goal**: 開発者はDocker ComposeでPostgreSQLデータベースをセットアップし、Prismaスキーマを適用できる。

**Independent Test**: 開発者はDocker ComposeでPostgreSQLを起動し、Prismaマイグレーションを実行できる。データベース接続テストが成功する。

### User Story 2の実装

- [ ] T023 [US2] docker-compose.ymlにPostgreSQLサービスを定義（データベース: todo_app_dev、ユーザー: postgres、パスワード: postgres、ポート: 5432）
- [ ] T024 [US2] 基本設定を含むsrc/backend/prisma/schema.prismaを作成
- [ ] T025 [US2] src/backend/prisma/schema.prismaでPrisma接続設定を設定（DATABASE_URL環境変数を使用）
- [ ] T026 [US2] src/backend/package.jsonにPrisma依存関係を追加（@prisma/client、prisma）
- [ ] T027 [US2] README.mdにPrismaマイグレーション実行の手順を記述（docker-compose exec backend yarn prisma db push、yarn prisma generate）
- [ ] T028 [US2] データベース接続テストスクリプトを作成（src/backend/test-db-connection.ts）
- [ ] T029 [US2] README.mdにデータベース接続テストの実行方法を記述（docker-compose exec backend yarn test:db）
- [ ] T030 [US2] .env.exampleにDATABASE_URL形式を記載（Docker Compose使用時: postgresql://postgres:postgres@db:5432/todo_app_dev）

**チェックポイント**: この時点で、User Stories 1 AND 2の両方が独立して動作する必要があります - データベースをセットアップし、接続できます

---

## Phase 5: User Story 3 - プロジェクト構造の初期化 (Priority: P3)

**Goal**: 開発者はプロジェクトのディレクトリ構造を作成し、基本的な設定ファイルを配置できる。

**Independent Test**: 開発者はプロジェクトのディレクトリ構造を作成し、基本的な設定ファイルを配置できる。プロジェクト構造が完成し、Docker Composeで開発サーバーが正常に起動する。

### User Story 3の実装

- [ ] T031 [US3] src/frontend/app/app.vueを確認・更新（Nuxt.jsルートコンポーネント）
- [ ] T032 [US3] src/frontend/app/pages/ディレクトリ構造を作成
- [ ] T033 [US3] src/frontend/app/components/ディレクトリ構造を作成
- [ ] T034 [US3] src/frontend/app/composables/ディレクトリ構造を作成
- [ ] T035 [US3] src/backend/src/main.tsを作成（NestJSエントリーポイント）
- [ ] T036 [US3] src/backend/src/app.module.tsを作成（ルートモジュール）
- [ ] T037 [US3] 将来の共通ライブラリ用にsrc/shared/ディレクトリを作成
- [ ] T038 [US3] プロジェクト構造がplan.mdの仕様と一致することを確認

**チェックポイント**: すべてのユーザーストーリーが独立して機能する必要があります - 完全なプロジェクト構造が準備できました

---

## Phase 6: 仕上げと横断的関心事

**目的**: 複数のユーザーストーリーに影響する改善

- [ ] T039 [P] README.mdにDocker Composeのトラブルシューティングセクションを追加（ポート競合、コンテナエラーなど）
- [ ] T040 [P] README.mdにDocker Composeの便利なコマンドを追加（コンテナ内でのコマンド実行方法など）
- [ ] T041 セットアップ検証スクリプトを作成（オプション: scripts/verify-setup.shまたはverify-setup.ps1）
- [ ] T042 quickstart.mdの検証を実行し、すべての検証手順が動作することを確認
- [ ] T043 [P] .gitignoreにDocker関連のエントリを追加（必要に応じて）

---

## 依存関係と実行順序

### フェーズ依存関係

- **セットアップ（Phase 1）**: 依存関係なし - すぐに開始可能
- **基盤（Phase 2）**: セットアップ完了に依存 - すべてのユーザーストーリーをブロック
- **ユーザーストーリー（Phase 3+）**: すべて基盤フェーズの完了に依存
  - ユーザーストーリーはその後並列で進行可能（人員がいる場合）
  - または優先順位順に順次進行（P1 → P2 → P3）
- **仕上げ（最終フェーズ）**: すべての希望するユーザーストーリーの完了に依存

### ユーザーストーリー依存関係

- **User Story 1 (P1)**: 基盤（Phase 2）後に開始可能 - No dependencies on other stories
- **User Story 2 (P2)**: 基盤（Phase 2）後に開始可能 - Docker Compose設定（US1）に依存
- **User Story 3 (P3)**: 基盤（Phase 2）後に開始可能 - 独立して実装可能

### 各ユーザーストーリー内

- Docker Compose設定の前にプロジェクト構造
- 設定の前にコアセットアップタスク
- 検証の前に設定
- 次の優先順位に進む前にストーリーを完了

### 並列実行の機会

- すべてのセットアップタスクマーク[P]は並列実行可能（T002-T005）
- すべての基盤タスクマーク[P]は並列実行可能（T008-T015）
- 基盤フェーズが完了すると、すべてのユーザーストーリーを並列で開始可能（チームの容量が許す場合）
- 異なるユーザーストーリーは異なるチームメンバーによって並列で作業可能

---

## 並列実行例: User Story 1

```bash
# Docker設定ファイルを並列で作成:
タスク: "Docker Compose設定ファイル（docker-compose.yml）を作成"
タスク: ".dockerignoreファイルを作成"
タスク: "フロントエンド用のDockerfileを作成（src/frontend/Dockerfile）"
タスク: "バックエンド用のDockerfileを作成（src/backend/Dockerfile）"
```

---

## 実装戦略

### MVP優先（User Story 1のみ）

1. Phase 1: セットアップを完了
2. Phase 2: 基盤を完了（重要 - すべてのストーリーをブロック）
3. Phase 3: User Story 1（Docker Compose設定）
4. **停止して検証**: Docker Composeでサービスを起動し、正常に動作することを確認
5. 準備ができたらデプロイ/デモ

### インクリメンタル配信

1. セットアップ + 基盤を完了 → 基盤準備完了
2. User Story 1を追加（Docker Compose設定） → テスト独立 → デプロイ/デモ（MVP！）
3. User Story 2を追加（データベースセットアップ） → テスト独立 → デプロイ/デモ
4. User Story 3を追加（プロジェクト構造） → テスト独立 → デプロイ/デモ
5. 各ストーリーは以前のストーリーを壊すことなく価値を追加

### 並列チーム戦略

複数の開発者で:

1. チームがセットアップ + 基盤を一緒に完了
2. 基盤が完了したら:
   - 開発者A: User Story 1（Docker Compose設定）
   - 開発者B: User Story 2（データベースセットアップ）
   - 開発者C: User Story 3（プロジェクト構造）
3. ストーリーは独立して完了し、統合

---

## 注意事項

- [P]タスク = 異なるファイル、依存関係なし
- [Story]ラベルは追跡可能性のためにタスクを特定のユーザーストーリーにマッピング
- 各ユーザーストーリーは独立して完了可能かつテスト可能である必要がある
- 各タスクまたは論理グループの後にコミット
- 任意のチェックポイントで停止し、ストーリーを独立して検証
- 避けるべきこと: 曖昧なタスク、同じファイルの競合、独立性を壊すストーリー間の依存関係
- **Docker Compose**: すべてのサービスはDocker Composeで起動することを前提とする

