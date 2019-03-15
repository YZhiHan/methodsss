<?php 
// 用户信息
class UserController{
    public function add(){
       $model=new UserModel('user');
       $model->setUser();
    }
    public function search(){
       $model=new UserModel('user');
       $model->getUserList();
    }
    public function update(){
      $model=new UserModel('user');
      $model->updateUser();
      }
      public function searchAlluser(){
         $model=new UserModel('user','user_detail');
         $model->searchMoreuser();
     }   
}