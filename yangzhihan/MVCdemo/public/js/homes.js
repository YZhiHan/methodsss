var html_ = '';
var img_arr = [];
var ARR = [];
$.ajax({
    type: 'post',
    url: '../../index.php',
    data: {
        c: 'Product',
        a: 'search',
    },
    success: function (e) {
        var arr = JSON.parse(e);
        debugger
        for (var i = 0;i < arr.length;i++) {
            if (arr[i].state == '上架') {
                html_ += ' <a href="detail.html?' + arr[i].ID + '" class="item"><img src="../../uploads/' + JSON.parse(arr[i].img)[0] + '" alt=""><p class="topTitle clearfix"><span class="titleText"><span>NEW!</span>' + arr[i].number + '</span><span class="btn fr">' + arr[i].type + '</span></p><p class="bottomTitle"><span class="bottomPrice">价格：<span>' + arr[i].selling + ',00</span></span><span class="bottomProName">' +arr[i].description + '</span></p></a>';
            }
        }
        $('.shop-list-items').html(html_);
    },
    error: function (e) {
        debugger
    }
})
