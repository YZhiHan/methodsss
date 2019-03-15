$(".prodType").css('background-color', '#C4CDE0')
$('.addBtn').on('click', function () {
    $('.list').css('display', 'block');
})
$('#cancle').on('click', function () {
    $('.list').css('display', 'none');
})
// 渲染顶级分类
var list_ = "";
$('.addBtn').on('click', function (this_) {
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Shoptype',
            'a': 'search',
        },
        success: function (e) {
            var arr = JSON.parse(e);
            for (var i in arr) {
                if (arr[i].fid == '0') {
                    list_ += '<option value="' + arr[i].ID + '">' + arr[i].shop_types + '</option>';
                }
            }
            $("#chose").html('<option value = "0">顶级分类</option>' + list_);
        },
        error: function (e) {
            debugger
        }
    })
})


// 向库中存储商品类型
function submit(obj) {
    types = obj.parentNode.parentNode.firstElementChild.lastElementChild.value;
    fid_ = obj.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.value;
    var objs = {
        'c': 'Shoptype',
        'a': 'add',
        'arr': {
            'fid': fid_,
            'shop_types': types,
        }
    }
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: objs,
        success: function (e) {
            layer.msg('添加分类成功', {icon: 1});
            obj.parentNode.parentNode.firstElementChild.lastElementChild.value = '';
            $('.list').css('display', 'none');
            // 重新渲染页面
            createType();
        },
        error: function (e) {
            debugger
        }
    })
}
// 页面渲染
var arr = [];
function createType() {
    // 顶级分类的渲染
    var html_ = '';
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Shoptype',
            'a': 'search',
        },
        success: function (e) {
            arr = JSON.parse(e);
            for (var i in arr) {
                if (arr[i].fid == 0) {
                    html_ += '<tr><td class="xh">' + (Number(i) + 1) + '</td><td><input type="text" value="' + arr[i].shop_types + '"><a onclick=uploads(this,' + arr[i].ID + ')>修改</a></td><td><div onclick="opens(this,' + arr[i].ID + ')">展开</div><div class="td-wrap"></div></td></tr>';
                }
            }
            $('.conts').html(html_);

        },
        error: function (e) {
            debugger
        }
    })
}
createType();
// 二级分类的渲染
$index = 0;
function opens(obj, id) {
    debugger
    $index++;
    if ($index % 2 == "0") {
        obj.innerHTML = '展开';
        obj.nextElementSibling.style.display = 'none';
    } else {
        obj.innerHTML = '收起';
        obj.nextElementSibling.style.display = 'block';
    }
    var arrs = [];
    for (var i in arr) {
        if (id == arr[i].fid) {
            arrs.push(arr[i]);
        }
    }
    $html = '';
    for (var i in arrs) {
        $html += '<input type="text" value="' + arrs[i].shop_types + '"><a onclick=changes(this,' + arrs[i].ID + ')>修改</a>';
    }
    obj.nextElementSibling.innerHTML = $html;

}
// 修改一级分类
function uploads(this_, id) {
    var firsttype = this_.previousSibling.value;
    var obj = {
        'c': 'shoptype',
        'a': 'update',
        'arr': {
            'ID': id,
            'shop_types': firsttype,
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
}
// 修改二级分类
function changes(this_, id) {
    var firsttype = this_.previousSibling.value;
    var obj = {
        'c': 'shoptype',
        'a': 'update',
        'arr': {
            'ID': id,
            'second_type': firsttype,
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
}