import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 データベース接続をテストしています...');
    console.log('📋 DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@') || '未設定');
    
    // データベース接続をテスト
    await prisma.$connect();
    console.log('✅ データベース接続成功！');
    
    // 簡単なクエリを実行して接続を確認
    const result = await prisma.$queryRaw`SELECT 1 as test, current_database() as database_name, version() as pg_version`;
    console.log('✅ クエリ実行成功:');
    console.log('   - テスト結果:', result);
    
    console.log('\n✅ データベース接続テスト完了');
    console.log('📝 データベースは正常に動作しています。');
  } catch (error: any) {
    console.error('\n❌ データベース接続エラー:');
    console.error('   エラーメッセージ:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 解決方法:');
      console.error('   1. PostgreSQLが起動しているか確認してください');
      console.error('   2. .envファイルのDATABASE_URLが正しいか確認してください');
      console.error('   3. データベース todo_app_dev が作成されているか確認してください');
    } else if (error.code === 'P1001') {
      console.error('\n💡 解決方法:');
      console.error('   1. PostgreSQLが起動しているか確認してください');
      console.error('   2. データベース todo_app_dev が作成されているか確認してください');
      console.error('   3. ユーザー postgres のパスワードが正しいか確認してください');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

