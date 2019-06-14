
$(function(){
    // 给body换背景
    $("#bg-color").on("click","li a",function(e){
        e.preventDefault();
        var val=$(e.target).html();
        if(val==="Dark"){
            $("body").css("background","#1D2024");
        }else if(val==="Blur"){
            $("body").css("backgroundImage","URL(img/login-img/blur.jpg)");
        }else{
            $("body").css("background","#E0E1E3");
        }
    });

  //用户名和密码获得焦点时让它们的兄弟span出现
    $("#uname").focus(getFocus);
    $("#upwd").focus(getFocus);
    function getFocus(){
        $(this).next().removeClass();
        $(this).val("");
    }
    //失去焦点时正则的验证
    $("#uname").blur(function(){
        vali($(this),/^1[34578]\d{9}$/);
    });
    $("#upwd").blur(function(){
        vali($(this),/^\d{1,10}$/);
    });
    //失去焦点时的正则验证方法提取
    function vali(txt,reg){
        var span=txt.next();
        if(reg.test(txt.val())){
            span.addClass("vali_success");
            return true;
        }else{
            span.addClass("vali_fail");
            return false;
        }
    }
    //点击提交按钮，进行后台验证
    $("#bt-login").click(function(){
        var $uname=$("#uname").val();
        var $upwd=$("#upwd").val();
        if($uname!==""&&$upwd!==""){
            $.ajax({
                type:'post',
                url:'/user/login',
                data:{uname:$uname,upwd:$upwd},
                success:function(data){
                    console.log(data);
                    if(data.code===200){
                        //在客户端存储会话基本的数据：loginUname
                        sessionStorage['loginUname']=data.uname;
                        location.href="main.html";
                    }else if(data.code===400){
                        $("#uname").next().removeClass("vali_success").html(data.msg)
                    }else if(data.code===405){
                        $("#upwd").next().removeClass("vali_success").html(data.msg)
                    }else{
                        console.log(data.msg);
                    }
                }
            });
        }
    });
})
