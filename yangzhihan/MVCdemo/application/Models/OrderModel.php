<?php
class OrderModel extends Model{
    public function __construct($tbale,$table2 =""){
     parent::__construct($tbale,$table2);
    }
    // 获取所有用户
    public function getOrderList(){
     echo(json_encode(parent::select()));
    }
    
    // 添加用户 注册
    public function setOrder(){
        echo(json_encode(parent::insert($_POST['arr'])));
    }
    // 查询单条数据
    public function getAddressOneByid(){
       $result = $_POST['Id'];
       return $this-> selectByPk($result);
    }
    // for循环查询单条
    public function searchOneProduct(){
        $list = $_POST['arr'];
        $len = count($list);
        $arr=[];
        for($i=0;$i<$len;$i++){
            $new=$this->selectByPk($list[$i]);
            array_push($arr,$new);
        }
        return $arr;
    }
    // 删除数据
    public function deleteOrder(){
        echo(json_encode(parent::delete($_POST['ID'])));
    }
    // 多表查询
    public function searchMore(){
        echo(json_encode(parent::selectMore()));
    }
     
}