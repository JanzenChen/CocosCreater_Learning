var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'wxq520818',
    database : 'db_user'
});

// pool.query({
//     sql : 'select * from t_user where t_user.userName=? and t_user.password=?',
//     values : ['wxq520818','wxq5201314']
// },function(error,rows,fields){
//     var result = '';

//     for (var row of rows) {
//         for (var field of fields) {
//             result += ('  ' + row[field.name]);
//         }
//     }
//     console.log(result);
// });


exports.login = function login(user,socket) {
    var sql = 'select * from t_user where t_user.userName=? and t_user.password=?';
    var values = [];
    values.push(user.userName);
    values.push(user.password);

    console.log(values);
    pool.query({sql:sql,values:values},function(err, rows, fields){
        if (0 == rows.length) {
            socket.emit('loginResult','账号密码错误!');
        } else {
            socket.emit('loginResult','登录成功!');
        }
    });
} 