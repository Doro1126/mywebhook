const mysql = require('mysql2'); // mysql2를 권장

const db = mysql.createConnection({
  host: '10.10.100.231',  // MySQL 서버 IP
  user: 'root',           // MySQL 사용자명
  password: 'test123', // MySQL 비밀번호
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
