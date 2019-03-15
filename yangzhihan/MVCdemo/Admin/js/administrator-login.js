var name = '';
var password = '';
$('#regist').on('click',function(){
    name = $('#magname').val();
    password = $('#magpassword').val();
    debugger
    var obj = {
        'c':'Mer',
        'a':'add',
        'arr':{
            'administrator_name':name,
            'administrator_password':password,
        }
    }
    $.ajax({
        type:'post',
        url:'../../index.php',
        data:obj,
        success:function(e){
            
        },
        error:function(e){
            debugger
        }
    })
})
// 是否登录
$('#magname').on('focus', function () {
    $('.error').css('display', 'none');
    $('.noname').css('display', 'none');
})
$('#magpassword').on('focus', function () {
    $('.error').css('display', 'none');
    $('.nopaw').css('display', 'none');
})
var flag = 0;
$('#login').on('click',function(){
    name = $('#magname').val();
    password = $('#magpassword').val();
    if(name == ''){
       $('.noname').css('display','block');
    }
    if(password == ''){
        $('.nopaw').css('display','block');
    }else{
        var obj = {
            'c':'Mer',
            'a':'search',
        }
    }
    $.ajax({
        type:'post',
        url:'../../index.php',
        data:obj,
        success:function(e){
            var arr = JSON.parse(e);
            for(var i in arr){
                if(arr[i].administrator_name == name){
                    flag = 0;
                }
                if(arr[i].administrator_password == password){
                    flag = 0;
                }else{
                    flag = 1;
                }
            }
            if(flag == 0){
                layer.msg('登录成功', {icon: 1});
                setTimeout(function(){
                    location.href = 'home.html';
                },500)
            }else{
                $('.error').css('display','block');
            }
        },
        error:function(e){
                debugger
        }
    })
})