<?php
class AddressModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    // 获取所有用户
    public function getAddressList(){
     echo(json_encode(parent::select()));
    }
    
    // 添加用户 注册
    public function setAddress(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 查询单条数据
    public function getAddressOneByid(){
        echo(json_encode(parent::selectByPk($_POST['needId'])));
    }
    // 删除数据
    public function deleteAddress(){
        echo(json_encode(parent::delete($_POST['ID'])));
    }
}