var str = localStorage.getItem('userinfor');

 window.onload = function () {
    var htmls = '';
    var welcom = document.getElementsByClassName('welcom')[0];
    if(str == null){
        htmls = '欢迎来到萌热商城<a onclick="login()">[请登录]</a><a onclick = "regist()">[请注册]</a>';
    }else{
        var arr = JSON.parse(str).data;
            htmls = '欢迎来到萌热商城<a onclick = "goperson()">[' + arr.username + ']</a><a onclick = "buy()">[退出]</a>';
    } 
    welcom.innerHTML = htmls;
}
function goperson() {
    window.location.href = 'person.html';
}
function buy() {
    localStorage.clear();
    window.location.href = 'login.html';
}
function login() {
    window.location.href = 'login.html';
}
function regist() {
    window.location.href = 'register.html';
}
$('.person').on('click',function(){
    if(str == null){
        alert('请先登录')
    }else{
        location.href = 'person.html';
    }
});
