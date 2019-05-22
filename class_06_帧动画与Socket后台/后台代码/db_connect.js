var mysql = require('mysql');

var crypto = require('crypto');

var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'wxq520818',
    database : 'test_user_db'
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

exports.loginIn = function loginIn(loginModel,callback) {
    var sql = 'select * from t_user where t_user.userId=? and t_user.loginSign=?';
    var values = [];
    values.push(loginModel.userId);
    values.push(loginModel.userSign);

    console.log('loginIn ->' + values);
    pool.query({sql:sql,values:values},function(err, rows, fields){
        if (null != err || 0 == rows.length) {
            if(callback) {
                callback('账号密码错误!',null);
            }
            return;
        }
        var user = rows[0];
    
        updateLoginSign(user,callback);
    });
} 

exports.checkPassword = function checkPassword(user,callback) {
    var sql = 'select * from t_user where t_user.userName=? and t_user.password=?;';
    var values = [];
    values.push(user.userName);
    values.push(user.password);

    console.log('checkPassword ->' + values);
    pool.query({sql:sql,values:values},function(err, rows, fields){
        if (null != err || 0 == rows.length) {
            if(callback) {
                callback('账号密码错误!',null);
            }
            return;
        }
        var user = rows[0];
    
        updateLoginSign(user,callback);
    });
} 

function updateLoginSign(user ,callback) {
    var userIdSub = parseInt(user.userId.toString().slice(0,1));
    var password = user.password;
    var sign = password.slice(0,userIdSub) + user.userId + password.slice(userIdSub);
    var md5Sign = crypto.createHash('md5').update(sign).digest('hex'); 

    var sql = 'UPDATE t_user SET t_user.loginSign=? WHERE t_user.userId=?;';
    pool.query({sql:sql,values:[md5Sign,user.userId]},function(err,result){
        console.log('------>' + result.affectedRows);
        if (null != err || 1 != result.affectedRows) {
            if(callback) {
                callback('账号密码错误!',null);
            }
            return;
        }

        if(callback) {
            user.loginSign = md5Sign;
            callback('登录成功!',user);
        }
    });
}