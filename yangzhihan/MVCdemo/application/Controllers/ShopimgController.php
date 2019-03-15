<?php 
class ShopimgController{
    public function add(){
       $model=new ShopimgModel('shopimg');
       $model->setShopimg();
    }
    public function search(){
       $model=new ShopimgModel('shopimg');
       $model->getShopimgList();
    }
}