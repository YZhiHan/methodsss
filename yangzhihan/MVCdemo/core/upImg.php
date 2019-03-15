<?php

    // 上传单张图片
    $img = $_FILES['uploadFile'];

    // 获取图片名称
    $img_name = $img['name'];
    
    // 获取文件 格式类型
    $file_type = $img['type'];
    
    // 文件在服务器中的临时位置
    // 文件上传后存放的临时路径，通过设置可以将文件放在我们需要的目录中，
    $file_tempname = $img['tmp_name'];
    
    // $times = time();
    
    move_uploaded_file($file_tempname,'../uploads/'.$img_name);
    
    echo $img_name;



?>