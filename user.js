const pool=require('./pool');
/************使用index.js中的post请求的中间件*************************/
module.exports={
    /**
     * 接收客户端POST提交的请求数据：uname、upwd
     * 保存入数据库，向客户端返回JSON字符串，形如：{"code":1,"msg":"注册成功"}
     */
    register:(req,res)=>{
        //console.log(req.body);//{ uname: 'fjl', upwd: '123' }
        var uname=req.body.uname;
        pool.getConnection(function(err,conn){//直接使用中间件，不用每次都解析
            conn.query("SELECT * FROM t_user WHERE uname=?",[uname],function(err,result){
                console.log("数据库返回结果"+result);
                if(result.length===0){
                    var data={code:200,msg:"该用户名可用"};
                }else{
                    var data={code:-1,msg:"该用户名已经被占用"};
                }
                res.json(data);//把数据转换成json字符串并输出
                conn.release();//断开连接
            })
        })

    },
    insert:(req,res)=>{
        console.log(req.body);
        var uname=req.body.uname;
        var upwd=req.body.upwd;
        pool.getConnection(function(err,conn){//直接使用中间件，不用每次都解析
                conn.query('INSERT INTO t_user VALUES(null,?,?)',[uname,upwd],function(err,result){
                //console.dir(result);
                if(result.affectedRows===1){//判断insert影响行数
                    var data={code:200,msg:"register succ"}
                }else{
                    var data={code:500,msg:"sql err"}
                }
                res.json(data);//把数据转换成json字符串并输出
                conn.release();//断开连接
            });
        })
    },
    /**
     * 接收客户端POST提交的请求数据：uname、upwd
     * 验证登录信息是否正确，向客户端返回JSON字符串，形如：
     */
    login:function(req,res){
        var uName=req.body.uname;
        var uPwd=req.body.upwd;
        pool.getConnection(function(err,conn){
            conn.query('SELECT uid,uname,upwd FROM t_user WHERE uname=? AND upwd=?',[uName,uPwd],function(err,result){
                if(err){
                    var data={code:500,msg:"sql err"};
                }else{
                    if(result.length===0){
                     var data={code:400,msg:"没有此用户名"};
                    }else{
                        var select_upwd = result[0].upwd;
                        if(uPwd!==select_upwd){
                         var data={code:405,msg:"密码不正确"};
                        }else{
                          var data={code:200,msg:"用户名和密码都正确",uname:result[0].uname};
                        }
                    }
                }
                res.json(data);
                conn.release();
            })
        });
    }
};
