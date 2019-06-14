//ͷ头部获取时间
var dateArr=["日","一","二","三","四","五","六"];
var span=document.getElementById("date");
function time(){
    var now=new Date();
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var date=now.getDate();
    if(date<10){
        date="0"+date;
    }
    var day=now.getDay();
    var h=now.getHours();
    if(h<10){
        h="0"+h;
    }
    var m=now.getMinutes();
    if(m<10){
        m="0"+m;
    }
    var s=now.getSeconds();
    if(s<10){
        s="0"+s;
    }
    span.innerHTML=year+"年"+month+"月"+date+"日"+"  "+"星期"+dateArr[day]+" "+h+":"+m+":"+s;
}
//先调一下，避免刷新时的空白！
time();
//启动定时器
var timer=setInterval(time,1000);

//主体左边部分伸缩菜单
var spans=document.querySelectorAll("#menu>ul>li>span");
//console.log(spans);
for(var i=0;i<spans.length;i++){
    spans[i].onclick=function(){
        if(this.className=="open"){
            this.className="";
        }else{
            this.className="open";
        }
    }
};
//用户名动态获取
var uname=sessionStorage.loginUname;
if(uname==="15227995031"){
    $("#u-name").html("张三");
    $("#role").html("校长").css("color","#544F66");
}else if(uname==="15226918278"){
    $("#u-name").html("李四");
    $("#role").html("主任").css("color","#544F66");
}else{
    $("#u-name").html("王五");
    $("#role").html("教师").css("color","#544F66");
}
//左边叶签控制右边显示部分
$("#menu-list").on("click","li a",function(e){
    e.preventDefault();
     var $id=$(this).attr("href");
     $($id).addClass("active").siblings(".active").removeClass("active");
});
