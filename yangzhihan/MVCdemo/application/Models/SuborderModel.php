<?php
class SuborderModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    // 获取所有用户
    public function getOrderList(){
     echo(json_encode(parent::select()));
    }
    
    // 添加用户 注册
    public function setOrder(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 查询单条数据
    // public function getAddressOneByid(){
    //     echo(json_encode(parent::selectByPk($_POST['needId'])));
    // }
    // 删除数据
    public function deleteOrder(){
        echo(json_encode(parent::delete($_POST['ID'])));
    }
     
}