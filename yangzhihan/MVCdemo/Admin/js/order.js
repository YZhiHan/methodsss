var html_ = '';
$.ajax({
    type: 'post',
    url: '../../index.php',
    data: {
        'c': 'Order',
        'a': 'searchAll',
    },
    success: function (e) {
        var arr = JSON.parse(e);
        debugger
        for (var i in arr) {
            html_ += '<tr><td>' + (Number(i) + 1) + '</td><td>' + arr[i].name + '</td><td><div onclick="find(this,'+arr[i].product_id+')" style="color:blue;"><span class="nones">'+arr[i].product_num+'</span>查看商品详情</div><div class="product"></div><td>' + arr[i].phone + '</td><td>' + arr[i].province + arr[i].city + arr[i].county + arr[i].detail_address + '</td><td>￥ ' + arr[i].order_allprice + '</td><td>' + arr[i].order_number + '</td></tr>';
        }
        $('.content').html(html_);
        // debugger
    },
    error: function (e) {

    }
})
// 渲染商品详情
var index = 0;
function find(this_,product_id) {
    var htmls = '';
    index++;
    if(index %2 == '0'){
        this_.innerHTML = '查看商品详情';
        this_.nextElementSibling.style.display = 'none';
    }else{
        this_.innerHTML = '收起';
        this_.nextElementSibling.style.display = 'block';
    }
    $.ajax({
        'type': 'post',
        'url': '../../index.php',
        'data': {
            'c': 'Order',
            'a': 'searchones',
            'arr': product_id,
        },
        success: function (e) {
            var arr = JSON.parse(e);
            debugger
            for (var i in arr) {
                var img_ = JSON.parse(arr[i].img);
                htmls += '<ul ><li>'+ '<img src="../../uploads/'+img_[0]+'" style="height:50px;vertical-align:middle;">' + arr[i].name + arr[i].type +'</li><li>单价：￥' + arr[i].selling + '</li><li>商品编号' + arr[i].number + '</li></ul>'
            }
            this_.nextElementSibling.innerHTML =htmls;
        },
        error: function (e) {
            debugger
        }
    })
}