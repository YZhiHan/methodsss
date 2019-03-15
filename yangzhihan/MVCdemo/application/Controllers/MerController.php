<?php 
// 用户信息
class MerController{
    public function add(){
       $model=new MerModel('administrator');
       $model->setMer();
    }
    public function search(){
       $model=new MerModel('administrator');
       $model->getMerList();
    }
    public function update(){
      $model=new MerModel('administrator');
      $model->updateMer();
      }
}