var data_ = localStorage.getItem('userinfor');
var arrs = JSON.parse(data_).data;
var html_ = '';
// 获取购物车中的信息
if (arrs != null) {
    myid = arrs.id;
    var objs = {
        'c': 'Carshopping',
        'a': 'search',
    }
    $.ajax({
        type: "post",
        url: '../../index.php',
        data: objs,
        success: function (e) {
            var carIdarr = JSON.parse(e);
            getallProduct(carIdarr);

        },
        error: function (e) {
            debugger
        }
    })
} else {
    $('.contentNo').css('display', 'block');
    $('.content').css('display', 'block');
}
// 获取所有商品信息
function getallProduct(carIdarr) {
    var obj = {
        'c': 'Product',
        'a': 'search',
    }
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: obj,
        success: function (e) {
            var productarr = JSON.parse(e);
            draw(carIdarr, productarr);
        },
        error: function (e) {
            debugger
        }
    })
}
// 渲染页面
function draw(carIdarr, productarr) {
    var arr = [];//当前用户的购物车数据
    var useArr = [];//最终渲染页面使用的数组
    for (var i in carIdarr) {
        if (carIdarr[i].user_id == myid) {
            arr.push(carIdarr[i]);
        }
    }
    if (arr.length == 0) {
        $('.contentNo').css('display', 'block');
        $('.content').css('display', 'block');
    } else {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < productarr.length; j++) {
                if (arr[i].product_id == productarr[j].ID) {
                    useArr.push([carIdarr[i], productarr[j]]);
                }
            }
        }
        for (var i in useArr) {
            var imgs_ = JSON.parse(useArr[i][1].img)[0];
            html_ += '<li class="clearfix myli" tabIndex="'+useArr[i][0].ID+'"><input type="checkbox" class="check fl" tabIndex="'+ useArr[i][0].product_id + '" onclick="check(this)"><a href="" class="img fl"><img src="../../uploads/'+imgs_+'" alt="" class="upimg"></a><a href="" class="name fl">' + useArr[i][1].name + useArr[i][1].description + '</a><span class="prise fl">' + useArr[i][1].type + '</span></span><span class="prise fl">' + useArr[i][1].selling + '.00</span><span class="num fl"><div class="changNums clearfix"><a href="###" class="minus fl" onclick="delet(this)">-</a><input type="text" class="itNum fl" value="' + useArr[i][0].product_num + '" onblur="blur_(this)"><a href="###" class="add fl" onclick="add(this)">+</a></div></span ><span class="scort">' + useArr[i][1].scort + '</span><span class="prise fl allprice">' + Number(useArr[i][0].product_num) * Number(useArr[i][1].selling) + '.00</span><span class="operate fl" tabIndex="' + useArr[i][0].ID + '" onclick="remove(this)">删除</span></li>';
        }
        $('.drawinfor').html(html_);
    }
}
// 数量的修改
// 数量增加

function add(this_) {
    var val_ = this_.parentNode.firstChild.nextSibling;//数量框
    var Addindexs = Number(val_.value);
    var onepeice = this_.parentNode.parentNode.previousSibling;//单价
    var allprice = this_.parentNode.parentNode.nextSibling.nextSibling;//合计
    var scort = this_.parentNode.parentNode.nextSibling;//库存
    var num_ = Number(scort.innerHTML);
    if (val_.value < num_) {
        Addindexs++;
    } else {
        val_.value = num_;
    }
    val_.value = Addindexs;
    allprice.innerHTML = Number(onepeice.innerHTML) * Number(val_.value) + '.00';
}
// 数量减少
function delet(this_) {
    var val_ = this_.parentNode.firstChild.nextSibling;//数量框
    var Addindexs = Number(val_.value);
    var onepeice = this_.parentNode.parentNode.previousSibling;//单价
    var allprice = this_.parentNode.parentNode.nextSibling.nextSibling;//合计 
    if (val_.value <= 1) {
        val_.value = 1
    } else {
        Addindexs--;
    }
    val_.value = Addindexs;
    allprice.innerHTML = Number(onepeice.innerHTML) * Number(val_.value) + '.00';
}
// 数量框失去焦点的事件
function blur_(this_) {
    var onepeice = this_.parentNode.parentNode.previousSibling;//单价
    var allprice = this_.parentNode.parentNode.nextSibling.nextSibling;//合计 
    var scort = this_.parentNode.parentNode.nextSibling;
    var num_ = Number(scort.innerHTML);//库存
    if (this_.value >= num_) {
        this_.value = num_
    }
    if (this_.value <= 0) {
        this_.value = 0;
    }
    allprice.innerHTML = Number(onepeice.innerHTML) * Number(this_.value) + '.00';
}
// 全选，单选按钮
$('.checkAll').on('click', function () {
    var check = document.getElementsByClassName('check');//获取单个按钮
    for (var i = 0; i < check.length; i++) {
        check[i].checked = this.checked;
    }
    count();
})
function check(this_) {
    var flags = false;
    var checkAll = document.getElementsByClassName('checkAll')[0];//获取单个按钮
    var check = document.getElementsByClassName('check');//获取单个按钮
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked == false) {
            flags == false;
        }
        if (flags == false) {
            checkAll.checked = false;
        } else {
            checkAll.checked = true;
        }
    }
    count();
}

// 数量和总价
// 购物车数量
var shopping_num = 0;
var shopping_num_con = document.getElementsByClassName('allNum')[0];
//购物车总价格
var shopping_prise = 0;
var shopping_prise_con = document.getElementsByClassName('totalMoney')[0];

//计算购物车数量和总价格
var countArr = [];
function count() {
    countArr = [];//每次进入清空数组
    shopping_prise = 0;//每次进入清空数组
    var check = document.getElementsByClassName('check') //单个按钮集合
    for (var i = 0; i < check.length; i++) {
        var prise_ = check[i].parentNode.getElementsByClassName('allprice')[0].innerHTML;
        if (check[i].checked == true) {
            countArr.push(prise_);//如果选中，数组中添加一个
        }
    }
    var priseNum = countArr;
    shopping_num_con.innerHTML = priseNum.length;//购物车商品数量
    //计算总价格
    for (var i = 0; i < priseNum.length; i++) {
        shopping_prise += Number(priseNum[i])
    }
    shopping_prise_con.innerHTML = shopping_prise + '.00';
}

// 购物车删除单条数据
function remove(this_) {
    var goods_id = this_.tabIndex;
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Carshopping',
            'a': 'delete',
            'ID': goods_id,
        },
        success: function (e) {
            location.reload();
        },
        error: function (e) {
            debugger
        }
    })
}

$('.fillBtn').on('click',function(){
    debugger
    var obj = {};
    var checkArr = [];//存储选中的框
    // 准备数据
    var check = document.getElementsByClassName('check');//取单选按钮
    for(var i = 0;i < check.length;i++){
        if(check[i].checked == true){
            obj ={
                'id':check[i].tabIndex,
                'num':check[i].parentNode.getElementsByClassName('itNum')[0].value,
                'allprice':document.getElementsByClassName('totalMoney')[0].innerHTML,
            }
            checkArr.push(obj);
        }
    }
//    发送请求添加数据到订单确认表
    for(var i = 0;i < checkArr.length;i++){
        $obj = {
            'c':'Order',
            'a':'add',
            'arr':{
                userid:myid,
                productid: checkArr[i].id,
                number:checkArr[i].num,
                allprice:checkArr[i].allprice,
            }
        }
        $.ajax({
            type:'post',
            url:'../../index.php',
            data:$obj,
            success:function(e){
            },
            error:function(e){
                debugger
            }
        })
    }
    // 清空购物车
    var deletArr = [];
    var myli = document.getElementsByClassName('myli');
    for(var i = 0;i < myli.length;i++){
        var check_i = myli[i].getElementsByClassName('check')[0];
            if(check_i.checked == true){
                deletArr.push(myli[i].tabIndex);
            }     
            debugger
    }
    for(var i = 0;i < deletArr.length;i++){
        var obj = {
            'c':'Carshopping',
            'a':'delete',
            'ID':deletArr[i],
        }
        $.ajax({
            type:'post',
            url:'../../index.php',
            data:obj,
            success:function(e){
               location.reload();
            },
            error:function(e){
                debugger
            }
        })
    }
    $('.fillBtn').attr('href','orderIfm.html');
})

