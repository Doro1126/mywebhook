const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'default_token';
const SCRIPT_PATH = process.env.SCRIPT_PATH || '/lab/main.sh';

// 🔑 Webhook 엔드포인트
app.post('/webhook', (req, res) => {
  const { token } = req.body;

  if (token !== WEBHOOK_SECRET) {
    console.error('❌ Invalid Token:', token);
    return res.status(403).send('Forbidden');
  }

  console.log('✅ Token Validated, Executing Script...');

  // 스크립트를 /root/lab 디렉터리에서 실행
  exec(`./main.sh`, { cwd: '/lab' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Script execution error: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`⚠️ Script STDERR: ${stderr}`);
    }
    console.log(`✅ Script STDOUT: ${stdout}`);
    res.status(200).send('Script executed successfully!');
  });
});

// 🚀 서버 실행
app.listen(4000, () => {
  console.log('✅ Webhook listener is running');
});
