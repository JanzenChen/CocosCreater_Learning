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

// 查询服务器列表开放接口
exports.getSeverLists = function getSeverLists(loginModel,callback) {
    login(loginModel,(msg,user)=>{
        if (null == user) {
            if(callback) {
                callback('登录sign错误!',null);
            }
        } else {
            checkSeverLists(callback);
        }
    });
}

// 查询服务器列表
function checkSeverLists(callback) {
    var sql = 'select * from t_severLists';
    pool.query({sql:sql},(err,rows,fields)=>{
        if (null != err || 0 == rows.length) {
            if(callback) {
                callback('获取服务器列表失败!',null);
            }
            return;
        }
        if(callback) {
            callback('获取服务器列表成功!',rows);
        }
    });
}

// 获取某服务器线上的英雄列表
exports.getUserHeroLists = function getUserHeroLists(loginModel,severId,callback) {
    login(loginModel,(msg,user)=>{
        if (null == user) {
            if(callback) {
                callback('登录sign错误!',null);
            }
        } else {
            checkHeroListsOnSever(severId,user.userId,callback);
        }
    });
}

function checkHeroListsOnSever(severId,userId,callback) {
    var sql = 'select * from t_hero where severId=? and userId=? limit 2';
    var valeus = [];

    valeus.push(severId);
    valeus.push(userId);

    pool.query({sql:sql,values:valeus},(err,rows,fields)=>{
        if (null != err) {
            if(callback) {
                callback(0,'英雄列表获取失败!',null);
            }
            return;
        }

        if(callback) {
            callback(1,'英雄列表获取成功!',rows);
        }
    });
}

function getHeroOnSever(severId,userId,heroId,callback) {
    var sql = 'select * from t_hero where severId=? and userId=? and heroId=? limit 1';
    var valeus = [];

    valeus.push(severId);
    valeus.push(userId);
    valeus.push(heroId);

    pool.query({sql:sql,values:valeus},(err,rows,fields)=>{
    
        if (null != err) {
            if(callback) {
                callback(0,'英雄获取失败!',null);
            }
            return;
        }
        
        if (rows) {
            if(callback) {
                console.log(rows[0]);
                callback(1,'英雄获取成功!',rows[0]);
            }
        } else {
            callback(0,'英雄获取失败!',null);
        }
    });
}

// 英雄登陆某个服务器
exports.heroLoginOnSever = function heroLoginOnSever(loginOnModel,callback) {
    login(loginOnModel,(msg,user)=>{
        if (null != user) {
            getHeroOnSever(loginOnModel.severId,loginOnModel.userId,loginOnModel.heroId,callback);
        } else {
            if (callback) {
                callback(0,'英雄获取失败!',null);
            }
        }
    });
} 

function login(loginModel,callback) {
    var sql = 'select * from t_user where t_user.userId=? and t_user.loginSign=?';
    var values = [];
    values.push(loginModel.userId);
    values.push(loginModel.userSign);

    pool.query({sql:sql,values:values},function(err, rows, fields){
        if (null != err || 0 == rows.length) {
            if(callback) {
                callback('登录sign错误!',null);
            }
            return;
        }
        var user = rows[0];
        if (null != user) {
            if (callback) {
                callback('登录成功!',user);
            }
        }
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