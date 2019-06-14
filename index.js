const http=require('http');
const express=require('express');
const qs=require('querystring');
const user=require('./user');
var app=express();
var server=http.createServer(app);
app.listen(8080);
//向客户端提供静态资源的响应
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.redirect('/register.html');//重定向，访问/将注册页面给了用户，默认首页
});

/***********处理动态资源请求******************/
//处理请求主体post的中间件
app.use((req,res,next)=>{
    if(req.method==='POST'){
        req.on('data',(buf)=>{
            //把处理请求主体追加为req.body属性
            req.body=qs.parse(buf.toString());
            next();//等待请求主体异步处理完成再调用后面的

        })
    }else{//除了post的外的其他请求直接放行
        next();
    }
});


// app.all("*",function(req,res,next){
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin","*");
//     //允许的header类型
//     res.header("Access-Control-Allow-Headers","content-type");
//     //跨域允许的请求方式
//     res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//     if (req.method.toLowerCase() == 'options')
//         res.send(200);  //让options尝试请求快速结束
//     else
//         next();
// })

app.post('/user/register',user.register);
app.post('/user/insert',user.insert);
app.post('/user/login',user.login);










