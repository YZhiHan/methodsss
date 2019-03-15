// 上传发送请求
$img_name = '';
function upload() {
    $pic = $('#upload_img')[0].files[0];
    $fd = new FormData($('#pic3')[0]);
    if ($pic != undefined) {   //判断有无选择图片，，
        $fd.append('uploadFile', $pic);
        $.ajax({
            url: "pic.php",
            type: "post",
            // Form数据
            data: $fd,
            cache: false,
            contentType: false,
            processData: false,
            success: function (e) {
                $img_name = e;
                layer.msg('上传图片成功', {icon: 1});
            },
            error: function (e) {
                debugger
            }
        });
    } else {
        layer.msg('请添加图片', {icon: 8});
    }
}
// 判断添加还是修改
var time = new Date().getTime();
    var bnum_ = $('.bnum').val(time);//商品编号
$shopId = location.search.split('?')[1];
$('#keep').on('click', function () {
    var name_ = $('.name').val();//商品名称
    var type_ = $('#type option:selected').text();//商品分类
    var scort_ = $('.scort').val();//商品库存
    var time = new Date().getTime();
    var bnum_ = $('.bnum').val(time);
    bnum_ = time;//商品编号
    var cost_ = $('.cost').val();//成本价
    var selling_ = $('.selling').val();//售价
    var description_ = $('.ms').val();//商品描述
    var detail_ = getContent();//商品详情
    var state_ = $('#state').val();//上架状态
    if ($shopId == undefined) {
        // 新增
        var obj = {
            a: 'add',
            c: 'Product',
            arr: {
                name: name_,
                type: type_,
                scort: scort_,
                number: bnum_,
                cost: cost_,
                selling: selling_,
                description: description_,
                detail: detail_,
                state: state_,
                img: $img_name,
            }

        }
        $.ajax({
            type: 'post',
            url: '../../index.php',
            data: obj,
            success: function (e) {
                layer.msg('发布成功', {icon: 1});
                $('.name').val('');
                $('.scort').val('');
                $('.cost').val('');
                $('.selling').val('');
                $('.ms').val('');
                setTimeout(function(){
                    location.href='home.html';
                },500)
                
            },
            error: function (e) {
                debugger
            }
        })
    } else {
        // 修改
        var obj = {
            'c': 'Product',
            'a': 'update',
            'arr': {
                'ID': $shopId,
                name: name_,
                type: type_,
                scort: scort_,
                number: bnum_,
                cost: cost_,
                selling: selling_,
                description: description_,
                detail: detail_,
                state: state_,
                img: $img_name,
            }
        }
        debugger
        $.ajax({
            type: 'post',
            url: '../../index.php',
            data: obj,
            success: function (e) {
                layer.msg('修改成功', {icon: 1});
                setTimeout(function(){
                    location.href='home.html';
                },500)
                debugger
            },
            error: function (e) {
                debugger
            }
        })

    }

})

// 分类的渲染
var Arr = [];
var count = '';
$.ajax({
    type: 'post',
    url: '../../index.php',
    data: {
        'c': 'shoptype',
        'a': 'search',
    },
    success: function (e) {
        var arr = JSON.parse(e);
        for (var i in arr) {
            if (arr[i].fid == 0) {
                count += ' <option value="' + arr[i].ID + '">' + arr[i].shop_types + '</option>';
            }
            Arr.push(arr[i]);
        }
        $('#type').html('<option value="">选择</option>' + count);
    },
    error: function (e) {
        debugger
    }
})
//
var cont = '';
$('#type').on('change', function () {
    cont = '';
    $a = $('#type option:selected').val();
    for (var i in Arr) {
        if (Arr[i].fid == $a) {
            cont += '<option>' + Arr[i].shop_types + '</option>';
        }
    }
    $('#type_').html(cont);
    $('#type_').css('display', 'inline-block');
})


// 图片的渲染
var htmls = '';
function drawImg() {
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Product',
            'a': 'search',
        },
        success: function (e) {
            var arr = JSON.parse(e);
            for (var i in arr) {
                if ($shopId == arr[i].ID) {
                    $('.name').val(arr[i].name);
                    $('.scort').val(arr[i].scort);
                    $('.cost').val(arr[i].cost);
                    $('.bnum').val(arr[i].number);
                    $('.selling').val(arr[i].selling);
                    $('.ms').val(arr[i].description);
                    $('#state').val(arr[i].state);
                    $('.type').val(arr[i].type);
                    var img_ = JSON.parse(arr[i].img);
                    debugger
                    for (var j in img_) {
                        htmls += '<img src="../../uploads/' + img_[j] + '" alt=""></img>'
                    }
                    $('.pic').html(htmls);


                }
            }
        },
        error: function (e) {
            debugger
        }
    })
}
drawImg()
