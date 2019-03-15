<?php 
// 订单
class SuborderController{
    public function add(){
       $model=new SuborderModel('orderlist');
       $model->setOrder();
    }
    public function search(){
       $model=new SuborderModel('orderlist');
       $model->getOrderList();
    }
    public function searchone(){
        $model=new SuborderModel('orderlist');
        $model->getOrderOneByid();
    }
    public function delete(){
        $model=new SuborderModel('orderlist');
        $model->deleteOrder();
    }
}