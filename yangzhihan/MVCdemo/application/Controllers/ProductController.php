<?php 
// 商品发布
class ProductController{
    public function add(){
      $model=new ProductModel('shoplist');
      $model->setProduct();
    }
    public function search(){
      $model=new ProductModel('shoplist');
      $model->getProductList();
    }
    public function searchone(){
      $model=new ProductModel('shoplist');
      $model->getProductOneByid();
  }
    public function page(){
      $model=new ProductModel('shoplist');
      $model->limitShopping();
  }
  public function delete(){
    $model=new ProductModel('shoplist');
    $model->deleteProduct();
  }
  public function update(){
  $model=new ProductModel('shoplist');
  $model->updateProduct();
  }
}