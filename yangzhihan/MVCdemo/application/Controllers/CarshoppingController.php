<?php 
// 购物车
class CarshoppingController{
    public function add(){
       $model=new CarshoppingModel('shopcart');
       $model->setCarshopping();
    }
    public function search(){
       $model=new CarshoppingModel('shopcart');
       $model->getCarshoppingList();
    }
    public function update(){
        $model=new CarshoppingModel('shopcart');
        $model->updatenum();
        }
    public function searchone(){
        $model=new CarshoppingModel('shopcart');
        $model->getCarshoppingOneByid();
    }
    public function delete(){
        $model=new CarshoppingModel('shopcart');
        $model->deleteProduct();
    }
}