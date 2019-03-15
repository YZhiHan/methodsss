var url_ = location.search;
var name = url_.split('?')[1];
switch(name){
    case 'hand':
    index = '手办';
    break;
    case 'bag':
    index = '包';
    break;
    case 'toy':
    index = '公仔玩具';
    break;
    case 'ear':
    index = '耳机';
    break;
    case 'bolster':
    index = '抱枕';
    break;
    case 'note':
    index = '笔记本';
    break;
    case 'cup':
    index = '水杯';
    break;
    case 'cartoon':
    index = '卡通贴';
    break;
    case 'book':
    index = '漫画书';
    break;
} 
var Arr = [];
var html_ = '';
$.ajax({
    type:'post',
    url:'../../index.php',
    data:{
        c:'Product',
        a:'search',
    },
    success:function(e){
        var arr = JSON.parse(e);
        for(var i in arr){
            if(arr[i].type == index){
                Arr.push(arr[i]);
                debugger
            }
        }
        for(var i in Arr){
            var img_ = JSON.parse(Arr[i].img);
            html_ += ' <a href="detail.html" class="item"><img src="../../uploads/'+img_[i]+'" alt="" style="width:250px;"><p class="topTitle clearfix"><span class="titleText"><span>NEW!</span>'+Arr[i].number+'</span><span class="btn fr">'+Arr[i].type+'</span></p><p class="bottomTitle"><span class="bottomPrice">价格：<span>'+Arr[i].selling+',00</span></span><span class="bottomProName">'+Arr[i].name+  Arr[i].description+'</span></p></a>'
        }
        $('.shop-list-items').html(html_);
        $('.allNum').html(Number(i)+1);
        $('.type').text(Arr[i].type);
    },
    error:function(e){
        debugger
    }
})