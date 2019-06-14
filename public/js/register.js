$(function(){
    //页面验证
    var $uname=$("#uname");
    var $upwd=$("#upwd");
    var $upwd1=$("#upwd1");
    var reg1=/^1[34578]\d{9}$/;
    var reg2=/^\d{1,10}$/;
    var cs=true;
    //失去焦点时用户名验证
    $uname.blur(function(){
        regularTest(this,reg1,"手机号格式不正确");
        var $span=$(this).parent().next().children("span");
        if(!$(this).val()){
            $span.html("用户名不能为空!").css("color","#f00");
            cs = false;
            return ;
        }
        var uname=$(this).val();
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{"uname":uname},
            success:function(data){
                console.log('成功获取到异步返回的数据');
                console.log("*****************"+data);//Object {code:200,msg:"register succ"}
                if(data.code===200){
                    $span.html(data.msg);
                    cs = true;
                }else{
                    textColor($span,"该用户名已被占用");
                    // $span.html("该用户名已被占用").css("color","#f00");
                    cs = false;
                }
            }
        });
    });
    //失去焦点时密码验证
    $upwd.blur(function(){
        regularTest(this,reg2,"密码格式不正确");
    });
    //失去焦点时两次密码验证
    $upwd1.blur(function(){
        var $span=$(this).parent().next().children("span");
        if($(this).val()!==$upwd.val()){
            textColor($span,"两次密码不一样");
            cs = false;
        }
    });

    $uname.focus(function(){
        getfocus(this,"国内任意手机号");
    });
    $upwd.focus(function(){
        getfocus(this,"10个字符以内数字");
    });
    $upwd1.focus(function(){
        getfocus(this,"请确认密码");
    });


    //失去焦点事件正则表达式验证
    function regularTest(obj,reg,str){
        var $span=$(obj).parent().next().children("span");
        if(!reg.test($(obj).val())){
            textColor($span,str);
            cs = false;
            return ;
        }
    }
    //提醒语句文字颜色变换
    function textColor(obj,str){
        obj.html(str).css("color","#f00");
    }
    //重新获得焦点事件要调用的方法
    function getfocus(obj,str){
        $(obj).val("");
        var $span=$(obj).parent().next().children("span");
        $span.html(str).css("color","#737373");
    }
//点击注册按钮进行表单提交
    $("#bt-register").click(function(e){
        e.preventDefault();
        if(cs){
            $(this).prop("disabled",true);
            //表单序列化，把选定的表单中具有name属性的input连同值组成k=v&k=v
            var data=$("#form-register").serialize();
            console.log(data);
            $.ajax({
                type:'post',
                url:'/user/insert',
                data:data,
                success:function(data){
                    console.log('成功获取到异步返回的数据');
                    console.log(data);//Object {code:200,msg:"register succ"}
                    if(data.code===200){
                        $(".succ").css("display","block");
                            setTimeout(function(){
                                location.href="login.html";
                            },3000);
                    }else{
                        $(".succ").html("注册失败！")
                    }
                }
            });
        }
    });
});