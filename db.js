const mysql = require('mysql2'); // mysql2를 권장

const db = mysql.createConnection({
  host: 'terraform-20241227060603127100000002.cxouwm6o45aj.ap-northeast-1.rds.amazonaws.com',  // MySQL 서버 IP
  user: 'admin',           // MySQL 사용자명
  password: 'test1234', // MySQL 비밀번호
  database: 'webapp_db'   // 사용할 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL 연결 실패:', err.message);
    return;
  }
  console.log('✅ MySQL 원격 연결 성공');
});

module.exports = db;
