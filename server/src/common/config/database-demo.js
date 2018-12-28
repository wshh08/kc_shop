const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'xbyjshop',
  prefix: 'xbyjshop_',
  encoding: 'utf8mb4',
  host: '192.168.56.101',
  port: '3306',
  user: 'root',
  password: '2910',
  dateStrings: true
};
