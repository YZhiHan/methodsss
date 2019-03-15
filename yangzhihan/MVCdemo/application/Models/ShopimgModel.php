<?php

class ShopimgModel extends Model{
    public function __construct($tbale){
     parent::__construct($tbale);
    }
    

    // 获取所有用户
    public function getShopimgList(){
        // $sql='select * from `book_table`';
     echo(json_encode(parent::select()));
        // $model->execute($sql);
        //  操作数据库
        // 查询语句
    }
    
    // 添加用户 注册
    public function setShopimg(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }

}