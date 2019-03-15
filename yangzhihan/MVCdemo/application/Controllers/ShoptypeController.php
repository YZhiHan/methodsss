<?php
class ShoptypeController{
    public function add(){
       $model=new ShoptypeModel('shoptype');
       $model->setShoptype();
    }
    public function search(){
       $model=new ShoptypeModel('shoptype');
       $model->getShoptype();
    }
    public function delete(){
        $model=new ShoptypeModel('shoptype');
        $model->deleteShoptype();
     }
     public function update(){
      $model=new ShoptypeModel('shoptype');
      $model->updateShoptype();
      }
}
