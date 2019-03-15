// 获取焦点事件
$('#username').focus(function () {
    $('.plase-setname').css('display', 'none');
})
$('#password').focus(function () {
    $('.plase-password').css('display', 'none');
    $('.prompt').css('display', 'none');
})
$('#againpassword').focus(function () {
    $('.plase-again').css('display', 'none');
})
$('#phonenum').focus(function () {
    $('.plase-setphone').css('display', 'none');
    $('.truenum').css('display', 'none');
})
$('.check_').focus(function () {
    $('.yes').css('display', 'none');
})
// 提交时
$('.RegistBtn').on('click',function(){
    var check = document.getElementsByClassName('check_')[0].checked;
    var user_val = $('#username').val();
    var password_val = $('#password').val();
    var againps_val = $('#againpassword').val();
    var phone_val = $('#phonenum').val();
     $reg = /^1[3|4|5|8][0-9]\d{4,8}$/g;//手机验证
     var pasreg = /^([a-z]|[A-Z])([a-zA-Z\d]|[\d!@#\$%_\.]|[a-zA-Z!@#\$%_\.]|[a-zA-Z\d!@#\$%_\.]){5,15}/;//验证密码
     var submitFlag = false;//是否可以发送请求
     if(user_val == ''){
        $('.plase-setname').css('display', 'block');
        submitFlag = true;
     }
     if(phone_val == ''){
        $('.plase-setphone').css('display', 'block'); 
        $('.truenum').css('display', 'none');
        submitFlag = true;
     }
     if(password_val == ''){
        $('.plase-password').css('display', 'block');
         $('.prompt').css('display', 'none'); 
        submitFlag = true;
     }
     if(againps_val == ''){
        $('.plase-again').css('display', 'block');
        submitFlag = true;
     }
     //手机号格式不对
     if(phone_val !='' && $reg.test(phone_val) == false){
        $('.truenum').css('display', 'block');
        submitFlag = true;
     }
     //密码不符合要求时
     if(password_val != '' && pasreg.test(password_val) == false){
        $('.prompt').css('display', 'block'); 
        submitFlag = true;
     }
     if(password_val != againps_val){
        $('.plase-again').css('display', 'block');
        submitFlag = true;
     }
     if(check == false){
        $('.yes').css('display', 'block');
        submitFlag = true;
     }
     //发送请求
    if(submitFlag == false){
       $.ajax({
        type:'post',
        url:'../../index.php',
        data:{
            'c':'User',
            'a':'search',
        },
        success:function(e){
            var arr = JSON.parse(e);
            for(var i in arr){
                if(arr[i].username == user_val){
                    submitFlag = true;
                    layer.msg('该用户已存在', {icon: 6});
                    break;
                }
            }
            if(submitFlag == false){
                adduser(user_val,password_val); 
            }
        },
        error:function(e){
            debugger
        }
       })
    }
})
// 注册
function adduser(name,pass,phonenum){
    $nomal = $('.nomaluser').html();
    var obj = {
        'c':'User',
        'a':'add',
        'arr':{
            'username':name,
            'password':pass,
            'islogin':$nomal,
        }
    }
    $.ajax({
        type:'post',
        url:'../../index.php',
        data:obj,
        success:function(e){
            if(e == 'true'){
                debugger
                // alert('注册成功');
                // location.href = 'login.html';
                layer.msg('注册成功', {icon: 8});
                setTimeout(function(){
                    location.href = 'login.html';
                },1000)
            }
        },
        error:function(){
            debugger
        }
    })
}