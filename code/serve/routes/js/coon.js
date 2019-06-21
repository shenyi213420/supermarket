

//引入mysql
const mysql = require("mysql");
//创建建连接对象
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smms'
});

//执行连接方法
connection.connect();
console.log("数据库链接成功");

module.exports = connection;
