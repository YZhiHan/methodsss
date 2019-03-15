// 获取焦点事件
$('.loginInput1').on('focus', function () {
    $('.login-error1').css('display', 'none');
    $('.login-error2').css('display', 'none');
    $('.nullname').css('display', 'none');
})
$('.loginInput2').on('focus', function () {
    $('.login-error1').css('display', 'none');
    $('.login-error2').css('display', 'none');
    $('.nullpass').css('display', 'none');
})
// 登录
var flag1 = null;//判断信息正误
var flag2 = false;//判断是否注册
var flag = 0;//判断是否正常用户
var myid = '';
$('.loginSubmitBtn').on('click', function () {
    var user = $('.loginInput1').val();
    var pass = $('.loginInput2').val();
    if (user == '') {
        $('.nullname').css('display', 'block');
    }
    if (pass == '') {
        $('.nullpass').css('display', 'block');
    } else {
        var obj = {
            'c': 'User',
            'a': 'search',
        }
        $.ajax({
            type: 'post',
            url: '../../index.php',
            data: obj,
            success: function (e) {
                var arr = JSON.parse(e);
                debugger
                for (var i in arr) {
                    if (arr[i].islogin == '正常用户') {
                        flag = 0;
                    } else {
                        flag = 1;
                    }
                    if (arr[i].username == user) {
                        flag2 = true;
                        if (arr[i].password == pass) {
                            flag1 = true;
                            myid = arr[i].ID;
                            break;
                        } else {
                            flag1 = false;
                        }
                    } else {
                        flag1 = false;
                    }
                }
                if (flag2 == false) {
                    $('.login-error1').css('display', 'block');
                } else {
                    debugger
                    if (flag == 0) {
                        if (flag1) {
                            storeUserId(myid, user);
                            // alert('登录成功');
                            layer.msg('登录成功', {icon: 8});
                            setTimeout(function(){
                                location.href = 'index.html';
                            },1000)
                           
                        } else {
                            $('.login-error2').css('display', 'block');
                        }
                    } else {
                        alert('您已被列入黑名单，请联系管理员');
                    }
                }

            },
            error: function () {
                debugger
            }
        })
    }
})
// 本地存储用户ID 
function storeUserId(myid, user) {
    var obj = {
        data: {
            id: myid,
            username: user,
        }
    }
    var str = JSON.stringify(obj);
    localStorage.setItem('userinfor', str);
}   

  