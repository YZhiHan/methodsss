<?php

class MerModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    
    // 获取所有用户
    public function getMerList(){
        
     echo(json_encode(parent::select()));
       
    //  操作数据库
        // 查询语句
    }
    
    // 添加用户 注册
    public function setMer(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
     // 更新商品类型ID
     public function updateMer(){
        echo(json_encode(parent::update($_POST['arr'])));
   }
}