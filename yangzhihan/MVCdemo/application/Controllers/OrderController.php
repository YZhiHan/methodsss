<?php 
// 订单
class OrderController{
    public function add(){
       $model=new OrderModel('order_detail');
       $model->setOrder();
    }
    // 全查
    public function search(){
       $model=new OrderModel('order_detail');
       $model->getOrderList();
    }
    // 差一条
    public function searchone(){
        $model=new OrderModel('shoplist');
        $result=$model->getOrderOneByid();
        if($result){
            echo (json_encode($result));
        }
    }
    // 查一条(for循环)
    public function searchones(){
        $model=new OrderModel('shoplist');
        $result=$model->searchOneProduct();
        if($result){
            echo (json_encode($result));
        }
    }
    public function delete(){
        $model=new OrderModel('order_detail');
        $model->deleteOrder();
    }
    public function searchAll(){
        $model=new OrderModel('address','orderlist');
        $model->searchMore();
    }
}