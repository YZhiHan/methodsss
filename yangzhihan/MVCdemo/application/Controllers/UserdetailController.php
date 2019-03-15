<?php 
// 用户详情
class UserdetailController{
    public function add(){
       $model=new UserdetailModel('user_detail');
       $model->setUserdetail();
    }
    public function search(){
       $model=new UserdetailModel('user_detail');
       $model->getUserdetailList();
    }
    public function update(){
      $model=new UserdetailModel('user_detail');
      $model->updateUserdetail();
   }
   // public function searchmore(){
   //    $model=new UserdetailModel('user_detail','address');
   //    $model->morebiao();
   // }
}