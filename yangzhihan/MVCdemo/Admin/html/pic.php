<?php
    //此页面用于上传图片
    $file = $_FILES['pic'];
    $arr = [];
    foreach($file['name'] as $k=>$v){
        //获取当前的时间戳
    $time = time();
    // //获取文件的名字
    $name = $file['name'][$k];
    // //移动图片
    $file_tmpname=$_FILES['pic']['tmp_name'][$k];
    move_uploaded_file($file_tmpname,'../../uploads/'.$time.$name);
    // //返回存储的图片的名字。
    $a = $time.$name;
    array_push($arr,$a);
    }
    echo json_encode($arr);
?>