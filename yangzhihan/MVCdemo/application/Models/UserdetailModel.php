<?php

class UserdetailModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    
    // 获取所有个人
    public function getUserdetailList(){
     echo(json_encode(parent::select()));
       
    //  操作数据库
        // 查询语句
    }
    // 添加个人 详细信息
    public function setUserdetail(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 更新个人信息
    public function updateUserdetail(){
        echo(json_encode(parent::update($_POST['arr'])));
   }
//    public function morebiao(){
//     echo(json_encode($this->selectMore()));
// }
}