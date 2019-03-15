// 获取用户id
var data_ = localStorage.getItem('userinfor');
if (data_ != null) {
    var arrs = JSON.parse(data_).data;

    // 请求后台获取订单确认表信息
    (function getgoods() {
        $.ajax({
            type: 'post',
            url: '../../index.php',
            data: {
                'c': 'Order',
                'a': 'search',
            },
            success: function (e) {
                debugger
                var allid = JSON.parse(e);
                getAllgoods(allid);
            },
            error: function (e) {
                debugger
            }
        })
    })();
}
// 获取所有商品的信息
function getAllgoods(allid) {
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Product',
            'a': 'search',
        },
        success: function (e) {
            var goodsList = JSON.parse(e);
            debugger
            draw(allid, goodsList);
        },
        error: function (e) {
            debugger
        }
    })
}
// 渲染页面的方法
var product_num = [];//存储单条购物车商品数量
function draw(allid, goodsList) {
    debugger
    var AllPrice = [];
    var sameId = [];
    var newArr = [];
    for (var i in allid) {
        if (allid[i].userid == arrs.id) {
            sameId.push(allid[i].userid);
        }
    }
    if (sameId.length == 0) {
    } else {
        for (var i = 0; i < allid.length; i++) {
            for (var j = 0; j < goodsList.length; j++) {
                if (allid[i].productid == goodsList[j].ID) {
                    newArr.push([allid[i], goodsList[j]]);
                    debugger
                }
            }
        }
        var html_ = '';
        var allNum = 0;
        for (var i in newArr) {
            var imgs_ = JSON.parse(newArr[i][1].img)[0];
            debugger
            html_ += '<div class="order-tab-title" tabIndex="' + newArr[i][0].ID + '"><div class="subTitle fl" style="width:400px">商品信息</div><div class="subTitle fl" style="width:400px"></div><div class="subTitle fl">单价</div><div class="subTitle fl">数量</div><div class="subTitle fl">合计</div></div><div class="order-tab-main clearfix" tabIndex="' + newArr[i][0].productid + '"><a class="img fl"><img src="../../uploads/' + imgs_ + '" alt="" style="width:79px;"></a><a class="name fl">' + newArr[i][1].description + newArr[i][1].name + '</a><div class="total"><span class="totalName"><span>分类：</span><span>' + newArr[i][1].type + '</span></span></div><div class="onePrise">' + newArr[i][1].selling + '</div><div class="num">' + newArr[i][0].number + '</div><div class="allPrise">' + Number(newArr[i][1].selling) * Number(newArr[i][0].number) + '</div></div><div class="order-tab-font"><div><span class="num">' + newArr[i][0].number + '</span>件商品，总商品金额：<span class="prise">' + Number(newArr[i][1].selling) * Number(newArr[i][0].number) + '</span></div></div>';
            AllPrice.push(newArr[i][0].allprice);
            product_num.push(newArr[i][0].number);
        }
        for (var i = 0; i < AllPrice.length; i++) {
            allNum += parseInt(AllPrice[i]);
            $('.AllPrice').html(allNum);
        }
        $('.order-tab').html(html_);
    }
}
$val1 = $('#province option:selected').text();
// 存储地址
$('.addreBtn').on('click', function () {
    var obj = {
        'c': 'Address',
        'a': 'add',
        'arr': {
            'user_id': arrs.id,
            'province': $('#province option:selected').text(),
            'city': $('#city option:selected').text(),
            'county': $('#county option:selected').text(),
            'detail_address': $('#address').val(),
            'name': $('#name_').val(),
            'phone': $('#phone_').val(),
            'checks': $('.mr').prop("checked"),
        }
    }
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: obj,
        success: function (e) {
            search();
            $('#province option:selected').text('请选择');
            $('#city option:selected').text('请选择');
            $('#county option:selected').text('请选择');
            $('#address').val('');
            $('#name_').val('');
            $('#phone_').val('');
            $('.newAddre').css('display', 'none');

        },
        error: function (e) {
            debugger
        }
    })
})
// 渲染地址
search();
var htmls = '';
function search() {
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Address',
            'a': 'search',
        },
        success: function (e) {
            var arr = JSON.parse(e);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].user_id == arrs.id) {
                    htmls += '<div class="item clearfix on box" tabIndex="' + arr[i].ID + '" onclick="checked(this)"><p class="tag"></p><p><span class="name">' + arr[i].name + '</span>&nbsp;收</p><p class="address">' + arr[i].province + arr[i].city + arr[i].county + '<br>' + arr[i].detail_address + '</p><p class="phone">' + arr[i].phone + '</p></div>';
                }
            }
            $('.items').html(htmls);
        },
        error: function (e) {
            debugger
        }
    })
}
// 地址选中
function checked(this_) {
    $this_id = this_.tabIndex;
    $Allitem = $('.box');
    $len = $Allitem.length;
    for (var i = 0; i < $len; i++) {
        if ($Allitem[i].tabIndex == $this_id) {
            $Allitem[i].style.backgroundImage = "url('../img/orderIfm-addr.png')";
            $Allitem[i].style.backgroundRepeat = 'no-repeat';
            $Allitem[i].style.backgroundPosition = 'right bottom';
        } else {
            $Allitem[i].style.background = 'none';
        }
    }
}
// 提交订单
$('.submitAll').on('click', function () {
    // 获取uid
    $uid = arrs.id;
    // 总价
    $allPrise = Number($('.AllPrice').text());
    // 获取时间戳生成订单编号
    $orderNum = new Date().getTime();
    // 商品数量的数组
    $oneProduct_num = JSON.stringify(product_num);
    // 商品id
    var Arr = [];//存储商品id
    $produ_ID = $('.order-tab-main');
    for (var i = 0; i < $produ_ID.length; i++) {
        Arr.push($produ_ID[i].tabIndex);
    }
    $product_id = JSON.stringify(Arr);
    // 用户名
    $username = document.getElementsByClassName('welcom')[0].firstElementChild.innerText.split('[')[1].split(']')[0];
    // 地址ID
    $Allitem = $('.box');
    $len = $Allitem.length;
    for (var i = 0; i < $len; i++) {
        if ($Allitem[i].style.background != 'none') {
            $addressid = $Allitem[i].tabIndex;
        }
    }
    var obj = {
        'c': 'Suborder',
        'a': 'add',
        'arr': {
            'u_id': $uid,
            'order_allprice': $allPrise,
            'order_number': $orderNum,
            'product_num': $oneProduct_num,
            'product_id': $product_id,
            'username': $username,
            'address_id': $addressid,
        }
    }
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: obj,
        success: function (e) {
            if (e == 'true') {
                // 删除订单确认表信息
                deleteorder();
                layer.msg('订单提交成功', { icon: 1 });
                setTimeout(function () {
                    location.href = 'orderOk.html';
                }, 1000)

            } else {
                layer.msg('订单提交失败', { icon: 1 });
            }
        },
        error: function (e) {
            debugger
        }
    })

})

// 删除订单确认表信息
function deleteorder() {
    // 数据数组
    $arr = [];
    var id_ = document.getElementsByClassName('order-tab-title');
    for (var i = 0; i < id_.length; i++) {
        $arr.push(id_[i].tabIndex);
    }
    // 发送请求
    for (var i = 0; i < $arr.length; i++) {
        $.ajax({
            type: 'post',
            url: '../../index.php',
            data: {
                'c': 'Order',
                'a': 'delete',
                'ID': $arr[i],
            },
            success: function (e) {
                debugger
            },
            error: function (e) {
                debugger
            }
        })
    }
}