<?php
class CarshoppingModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    

    // 获取所有用户
    public function getCarshoppingList(){
     echo(json_encode(parent::select()));
    }
    
    // 添加商品
    public function setCarshopping(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 查询单条数据
    public function getCarshoppingOneByid(){
        echo(json_encode(parent::selectByPk($_POST['needId'])));
    }
    // 删除数据
    public function deleteProduct(){
        echo(json_encode(parent::delete($_POST['ID'])));
    }
     // 更新购物车商品类型数量
     public function updatenum(){
        echo(json_encode(parent::update($_POST['arr'])));
   }
}