<?php
class ShoptypeModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    // 获取所有分类
    public function getShoptype(){
     echo(json_encode(parent::select()));
    }
    
    // 添加分类
    public function setShoptype(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 查询单条数据
    // public function getShoptypeOneByid(){
    //     echo(json_encode(parent::selectByPk($_POST['needId'])));
    // }
    // 删除数据
    public function deleteShoptype(){
        echo(json_encode(parent::delete($_POST['ID'])));
    }
     // 更新商品类型ID
     public function updateShoptype(){
        echo(json_encode(parent::update($_POST['arr'])));
   }
}