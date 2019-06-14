/***
 * 数据库连接池模块
 * 向外提供 pool 对象
 */
const mysql=require('mysql');
module.exports=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'manage',
    port:3306,
    connectionLimit:10  //连接池最大容量

});






