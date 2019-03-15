// page
// $page_ = 0; //总页数
// $one = 1;  //当前页数
// $.ajax({
//     type:'post',
//     url:'../../../index.php',
//     data:{'c':'Product','a':'search'},
//     success:function(e){
//         $page_ = JSON.parse(e).length;
//     }
// })

// // 想后台请求数据
// getShopList(0);
// function getShopList(e) {
//     $.ajax({
//         type: 'post',
//         url: '../../../index.php',
//         data: { 'c': 'Product', 'a': 'page', l: { page: e, limit: 3 } },
//         success: function (e) {
//             // 
//             new Page({
//                 id: 'pagination',
//                 pageTotal: Math.ceil($page_ / 3), //必填,总页数
//                 pageAmount: 3,  //每页多少条
//                 dataTotal: $page_, //总共多少条数据
//                 curPage: $one, //初始页码,不填默认为1
//                 pageSize: 5, //分页个数,不填默认为5
//                 showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
//                 showSkipInputFlag: true, //是否支持跳转,不填默认不显示
//                 getPage: function (page) {
//                     //获取当前页数
//                     console.log(page);
//                     // Page_=page;
//                     $one = page;
//                     getShopList(page - 1);
//                 }
//             })
//         },
//         error: function (e) {
//             debugger
//         }
//     })
// }
// 渲染商品列表
var html = '';
var id_ = 0;
$.ajax({
    type: 'post',
    url: '../../index.php',
    data: {
        'c': 'Product',
        'a': 'search',
    },
    success: function (e) {
        debugger
        var arr = JSON.parse(e);
        for (var i in arr) {
            if (arr[i].img != '') {
                var img_ = JSON.parse(arr[i].img)[0];
            }
            html += '<div class="thead tbody">'+(Number(i)+1)+'<div class="name" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"><input tabIndex="' + arr[i].ID + '" value="' + arr[i].name + '" style="width: 104px;"></div><div><img src="../../uploads/' + img_ + '" alt=""></div><div class="productnum" style="width: 100px !important;"><input type="text" value="' + arr[i].scort + '" style="width:80px;"></div><div class="scort"><input type="text" value="' + arr[i].number + '" style="width:100px;"></div><div class="price"><input type="text" value="' + arr[i].selling + '" style="width:40px"></div><div class="type"><input type="text" value="' + arr[i].type + '" style="width:100px;"></div><div><input style="width: 224px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"value="' + arr[i].description + '"></div><div class="one" style="text-align:center;"><select class="isup"><option value="上架">' + arr[i].state + '</option><option value="下架">下架</option><option>上架</option><select></div><div class="change"><a class="changeimg" onclick="changeimg(this,'+arr[i].ID+')">修改</a></div></div>';
        }
        $('.listbody').append(html);
    },
    error: function () {
        debugger
    }
})
// 删除数据
function deletes(obj) {
    var id_ = obj.parentNode.parentNode.firstChild.firstChild.tabIndex;
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: {
            'c': 'Product',
            'a': 'delete',
            'ID': id_,
        },
        success: function (e) {
            location.reload();
        },
        error: function (e) {
            debugger
        }
    })
}
//修改商品信息
function change(this_) {
    debugger
    var ids_ = this_.tabIndex;
    //商品库存
    var nums_ = this_.parentElement.parentElement.firstElementChild.nextSibling.nextSibling.lastElementChild;
    var costs = nums_.value;
    //    商品名称
    var name_ = nums_.parentElement.previousSibling.previousSibling.firstChild.value;
    //    售价
    var sellings = nums_.parentElement.nextSibling.nextSibling.lastElementChild.value;
    //   商品分类
    var types = nums_.parentElement.nextSibling.nextSibling.nextSibling.firstElementChild.value;
    //    商品描述
    var description = this_.parentElement.previousSibling.previousSibling.firstChild.value;
    //   商品状态
    var state = this_.parentElement.parentElement.lastElementChild.previousSibling.firstElementChild.value;
    var obj = {
        'c': 'Product',
        'a': 'update',
        'arr': {
            'ID': ids_,
            'name': name_,
            'scort': costs,
            'selling': sellings,
            'type': types,
            'state': state,
            'description': description,
        }
    }
    $.ajax({
        type: 'post',
        url: '../../index.php',
        data: obj,
        success: function (e) {
            location.reload();
        },
        error: function () {
            debugger
        }
    })
}

//  修改图片
function changeimg(obj,id) {
    location.href = 'publish.html' + '?' + id;
}
















