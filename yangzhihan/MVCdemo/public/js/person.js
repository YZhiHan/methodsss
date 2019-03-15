var str = localStorage.getItem('userinfor');
var datas = JSON.parse(str).data;
var id_ = datas.id;
    name_ = datas.username;
    $('.username').val(name_);
    
    debugger
  // 存储用户个人信息
  $('.personBtn').on('click', function () {
    var username = $('.username').val();//用户名
    var sex = $('input[name="sex"]:checked').val();//性别
    var email = $('.email').val();//邮箱
    var birthday = $('.birthday').val();//生日
    var start = $('.xz').val();//星座
    var phonenum = $('.phonenum').val();//手机号
    var blood = $('#selects option:selected').text();//血型
    var obj = {
            'a': 'add',
            'c': 'Userdetail',
            'arr': {
                username: username,
                sex: sex,
                email: email,
                birthday: birthday,
                constellation: start,
                phonenum: phonenum,
                blood: blood,
                u_id:id_,
            }
        }
        $.ajax({
            type: 'post',
            url: '../../index.php',
            data: obj,
            success: function (e) {
                debugger
            },
            error: function (e) {
            }
        })
})
var Arr = [];
    // 获取用户信息
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
        'a': 'search',
        'c': 'Userdetail',
        },
        success: function (e) {
            var result = JSON.parse(e);
            for(var i = 0; i< result.length;i++){
                if(result[i].u_id == id_){
                    $('.username').val(result[i].username);
                    $('input[name="sex"]:checked').val(result[i].sex);
                    $('.email').val(result[i].email);
                    $('.birthday').val(result[i].birthday);
                    $('.xz').val(result[i].constellation);
                    $('.phonenum').val(result[i].phonenum);
                    $('#selects option:selected').text(result[i].blood);
                    myid = result[i].ID;
                }
            }
        },
        error: function (e) {
        }
    })

var myid = '';

// 存储，修改个人信息
    $('.personBtn').on('click', function () {
        var username = $('.username').val();//用户名
        var sex = $('input[name="sex"]:checked').val();//性别
        var email = $('.email').val();//邮箱
        var birthday = $('.birthday').val();//生日
        var start = $('.xz').val();//星座
        var phonenum = $('.phonenum').val();//手机号
        var blood = $('#selects option:selected').text();//血型
            var obj = {
                'a': 'update',
                'c': 'Userdetail',
                'arr': {
                    ID:Number(myid),
                    username: username,
                    sex: sex,
                    email: email,
                    birthday: birthday,
                    constellation: start,
                    phonenum: phonenum,
                    blood: blood,
                }
            }
            $.ajax({
                type: 'post',
                url: '../../index.php',
                data: obj,
                success: function (e) {
                    debugger
                },
                error: function (e) {
                    debugger
                }
            })
    })


