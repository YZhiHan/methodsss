html_ = '';
var datas = [];
$.ajax({
    type:'post',
    url:'../../index.php',
    data:{
        'c':'User',
        'a':'searchAlluser',
    },
    success:function(e){
       var arr = JSON.parse(e);
       debugger
        for(var i in arr){
            if(arr[i].sex == null){
                draw(Number(i),arr[i].username,'暂无数据','暂无数据','暂无数据','暂无数据',arr[i].u_id,arr[i].islogin);
            }else{
                draw(Number(i),arr[i].username,arr[i].sex,arr[i].phonenum,arr[i].birthday,arr[i].constellation,arr[i].u_id,arr[i].islogin);
            }
            

               
        }
        $('.memberbody').append(html_);
    },
    error:function(e){
        debugger
    }
})
function draw(num,name,sex,phonenum,birthday,constellation,u_id,islogin){
    html_ +='<div class="memberinfor"><div>'+(num+1)+'</div><div>'+name+'</div><div class="address">'+sex+'</div><div>'+phonenum+'</div><div>'+birthday+'</div><div>'+constellation+'</div><div><p class="nametype" onclick="chose(this)" tabIndex="'+u_id+'">'+islogin+'</p></div></div>';
}
// 黑白名单设置
var index = 0;
function chose(this_){
    index++;
    if(index % 2 != 0){
        this_.className = 'black';
        this_.innerHTML = '黑名单';
    }else{
        this_.className = 'nametype';
        this_.innerHTML = '正常用户';
    }
    var cont = this_.innerHTML;
    var id_ = this_.tabIndex;
    debugger
    var obj = {
        'c':'User',
        'a':'update',
        'arr':{
             'ID':id_,
        'islogin':cont,
        }
    }
    $.ajax({
        type:'post',
        url:'../../index.php',
        data:obj,
        success:function(e){
            debugger
        },
        error:function(e){
            debugger
        }
    })
}
