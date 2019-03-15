<?php 
// 地址
class AddressController{
    public function add(){
       $model=new AddressModel('address');
       $model->setAddress();
    }
    public function search(){
       $model=new AddressModel('address');
       $model->getAddressList();
    }
    public function searchone(){
        $model=new AddressModel('address');
    }
    public function delete(){
        $model=new AddressModel('address');
        $model->deleteAddress();
    }
}