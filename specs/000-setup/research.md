# Research: プロジェクトセットアップ

**Date**: 2026-02-12
**Feature**: 000-setup

## Research Summary

セットアップ仕様は既に明確化されており、技術スタックも定義済みのため、追加のリサーチは不要。

## Decisions

### パッケージマネージャー: yarn

**Decision**: yarnを使用

**Rationale**: 
- npmの代替として安定性が高い
- 依存関係のロックファイル管理が明確
- 広く使用されており、コミュニティサポートが充実

**Alternatives considered**: 
- npm: Node.js標準だが、yarnの方が安定性が高い
- pnpm: 高速だが、プロジェクトではyarnを選択

### 開発サーバーポート: フロントエンド 3000、バックエンド 3001

**Decision**: フロントエンド 3000、バックエンド 3001

**Rationale**: 
- Nuxt.jsとNestJSの一般的なデフォルトポート
- 競合が少なく、開発者に馴染みがある

**Alternatives considered**: なし（標準的な選択）

### データベース接続設定

**Decision**: データベース名 todo_app_dev、ユーザー名 postgres、パスワード postgres、ホスト localhost、ポート 5432

**Rationale**: 
- PostgreSQLの一般的なデフォルト設定
- 開発環境でよく使用される設定
- セキュリティは本番環境で別途設定

**Alternatives considered**: なし（開発環境の標準設定）

### 環境変数: DATABASE_URL、JWT_SECRET、NODE_ENV

**Decision**: DATABASE_URL、JWT_SECRET、NODE_ENVを必須とする

**Rationale**: 
- DATABASE_URL: データベース接続に必要
- JWT_SECRET: 認証機能に必要（将来の機能実装に向けて）
- NODE_ENV: 環境判定に必要

**Alternatives considered**: なし（最小限の必須設定）

### セットアップ検証方法

**Decision**: 開発サーバー起動確認とデータベース接続テスト

**Rationale**: 
- 実際に動作することを確認できる
- シンプルで明確な検証方法
- 自動化可能

**Alternatives considered**: なし（実用的な検証方法）

