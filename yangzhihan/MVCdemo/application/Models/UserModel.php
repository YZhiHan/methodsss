<?php

class UserModel extends Model{
    public function __construct($tbale,$table2=''){
     parent::__construct($tbale,$table2);
    }
    
    // 获取所有用户
    public function getUserList(){
        
     echo(json_encode(parent::select()));
       
    //  操作数据库
        // 查询语句
    }
    
    // 添加用户 注册
    public function setUser(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
     // 更新商品类型ID
     public function updateUser(){
        echo(json_encode(parent::update($_POST['arr'])));
   }
   // 多表查询
   public function searchMoreuser(){
    echo(json_encode(parent::selectMoreuser()));
}
}