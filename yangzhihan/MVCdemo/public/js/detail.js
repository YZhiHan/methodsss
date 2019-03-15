var result = location.search;
var my_id = result.split('?')[1];
var myID = '';
var productNum = 1;
var arr_ = [];
var html_ = '';
var Img_ = '';
$.ajax({
    type: 'post',
    url: '../../index.php',
    data: {
        c: 'Product',
        a: 'search',
    },
    success: function (e) {
        var arr = JSON.parse(e);
        for (var i in arr) {
            if (arr[i].ID == my_id) {
                var img_ = JSON.parse(arr[i].img);
                $('#pricere').html('￥' + arr[i].selling);
                $('#okprice').html('￥' + arr[i].cost);
                $('.introduce').html(arr[i].description);
                $('.number_').html(arr[i].number);
                $('.scort').html(arr[i].scort);
                $('.goodscoll').html(arr[i].type);
                $('.detail_num').html(arr[i].number);
                $('.detail_name').html(arr[i].name);
                $('.goodsDEtail').html(arr[i].detail);
                myID = arr[i].ID;
                for (var j = 0; j < img_.length; j++) {
                    Img_ = ' <a href="###"><img src="../../uploads/' + img_[0] + '" alt="" style="max-width: 100%;max-height: 100%; cursor: crosshair" id="jqzooms"></a><div id="mask"></div>';
                    html_ += '<li class="tb-selected" onclick="select(this)"><div class="tb-pic"><a href="###" style="cursor: pointer;"><img src="../../uploads/' + img_[j] + '" alt=""></a></div></li>';
                }
                $('#objmask').append(Img_);
                $('.tb-thumb').append(html_);
            }
        }
    },
    error: function (e) {
        debugger
    }
})
// 放大镜
var jsder = document.getElementsByClassName('jsder')[0];
var tb_booth = document.getElementsByClassName('tb-booth')[0];
var jsder_show = document.getElementById('jsder_show');
var BigImg = jsder_show.getElementsByTagName('img')[0];
objmask.onmouseover = function () {
    mask.style.display = 'block';
    jsder_show.style.display = 'block';
}
objmask.onmouseout = function () {
    mask.style.display = 'none';
    jsder_show.style.display = 'none';
}
objmask.onmousemove = function (e) {
    var e = e || window.event;
    var _left = e.clientX - jsder.offsetLeft - tb_booth.offsetLeft - mask.offsetWidth / 2;
    var _top = e.clientY - jsder.offsetTop - tb_booth.offsetTop - mask.offsetHeight / 2;
    if (_left < 0) {
        _left = 0;
    }
    if (_left >= objmask.offsetWidth - mask.offsetWidth) {
        _left = objmask.offsetWidth - mask.offsetWidth;
    }
    if (_top < 0) {
        _top = 0;
    }
    if (_top >= objmask.offsetHeight - mask.offsetHeight) {
        _top = objmask.offsetHeight - mask.offsetHeight;
    }
    mask.style.left = _left + 'px';
    mask.style.top = _top + 'px';
    //求其比值
    var percentX = _left / (objmask.offsetWidth - mask.offsetWidth);
    var percentY = _top / (objmask.offsetHeight - mask.offsetHeight);
    //方向相反，小图片鼠标移动方向与大图片相反，故而是负值
    BigImg.style.left = -percentX * (BigImg.offsetWidth - jsder_show.offsetWidth) + "px";
    BigImg.style.top = -percentY * (BigImg.offsetHeight - jsder_show.offsetHeight) + "px";
}

// 库存数量的点击事件
$('.buttonup').on('click', function () {
    var myindex = 0;
    var max = Number($('.scort').text());
    var val_ = document.getElementById('checkStock').value;
    var val_num = Number(val_);
    if (val_num < max) {
        myindex = Number(val_);
        myindex++;
    } else {
        myindex = max;
    }
    $('#checkStock').val(myindex);
    productNum = $('#checkStock').val();
})
$('.buttondow').on('click', function () {
    var val_ = document.getElementById('checkStock').value;
    var val_num = Number(val_);
    var index = 0;
    if (val_num > 1) {
        index = Number(val_);
        index--;
    } else {
        index = 1;
    }
    $('#checkStock').val(index);
    productNum = $('#checkStock').val();
})
// 数量框失去焦点的事件
function changes() {
    $('#checkStock').on('blur', function () {
        var max = Number($('.scort').text());
        val_ = document.getElementById('checkStock').value;
        var val_num = Number(val_);
        if (val_num >= max) {
            $('#checkStock').val(max);
        }
        if (val_num <= 0) {
            $('#checkStock').val('1');
        }
        productNum = $('#checkStock').val();
    })
}
changes();
// 存储购物车  跳转页面
function go(this_) {
    var productId = myID;
    var data_ = localStorage.getItem('userinfor');
    var num = Number($('#checkStock').val());
    var flag = false;
    var newID = 0;
    var newnum = 0;
    if (data_ == null) {
        layer.msg('请先登录', {icon: 8});
    } else {
        var arrs = JSON.parse(data_).data;
        var myuserId = arrs.id;
        $.ajax({
            type: "post",
            url: '../../index.php',
            data: {
                'c': 'Carshopping',
                'a': 'search',
            },
            success: function (e) {
                $arr = JSON.parse(e);
                debugger
                for (var i in $arr) {
                    if ($arr[i].product_id == productId) {
                        flag = true;
                        newID = $arr[i].ID;
                        newnum = $arr[i].product_num;
                        break;
                    }
                }
                if (flag) {
                    // 更新当前商品在购物车中的数量
                    var obj = {
                        'c': 'Carshopping',
                        'a': 'update',
                        'arr': {
                            'ID': newID,
                            'product_num': Number(newnum) + num,
                        }
                    }
                    $.ajax({
                        type: 'post',
                        url: '../../index.php',
                        data: obj,
                        success: function (e) {
                            layer.msg('添加成功', {icon: 1});
                            debugger
                        },
                        error: function (e) {
                            debugger
                        }
                    })
                } else {
                    // 正常添加
                    var obj = {
                        'c': 'Carshopping',
                        'a': 'add',
                        'arr': {
                            'user_id': myuserId,
                            'product_id': productId,
                            'product_num': num,
                        }
                    }
                    $.ajax({
                        type: 'post',
                        url: '../../index.php',
                        data: obj,
                        success: function (e) {
                            layer.msg('添加购物车成功', {icon: 1});
                            debugger
                        },
                        error: function (e) {
                            debugger
                        }
                    })
                }
            },
            error: function (e) {
                debugger
            }
        });

    }
}
