const mysql = require('mysql2');

// Створення пулу підключень
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'call_center_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Експорт пулу промісів для асинхронних запитів
const promisePool = pool.promise();

module.exports = promisePool;