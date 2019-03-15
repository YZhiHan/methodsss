<?php
class ProductModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    

    // 获取所有商品信息
    public function getProductList(){
     echo(json_encode(parent::select()));
    }
    
    // 添加商品信息
    public function setProduct(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 查询单条数据
    public function getProductOneByid(){
        echo(json_encode(parent::selectByPk($_POST['needId'])));
    }
    // 删除的方法
    public function deleteProduct(){
        echo(json_encode(parent::delete($_POST['ID'])));
    }
    // 更新个商品信息
    public function updateProduct(){
        echo(json_encode(parent::update($_POST['arr'])));
   }
    // 分页
    public function limitShopping(){
        $l = $_POST['l'];
        $offset=$l['page'];
        $limit=$l['limit'];
        echo(json_encode($this->pageData($offset,$limit)));
    }
}