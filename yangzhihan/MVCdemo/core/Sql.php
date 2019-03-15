<?php
class Sql{
    protected $conn=false;// DB 连接资源对象
    protected $sql; //sql 语句
    public function __construct(){
        // echo(DB_NAME);
        $this->conn=new mysqli(HOST_NAME,DB_USERNAME,DB_PASSWORD,DB_NAME);
        if($this->conn->connect_errno){
            die($this->conn->error);
        }
        // 设置编码格式
        $this->setCharSet();
    }

    // 设置编码格式
    public function setCharSet(){
        $sql="set names ".DB_CHARSET;
        // $this->conn->query($sql);
        $this->exec($sql);
    }
    // 执行sql语句的 
    public function exec($sql){
        $this->sql=$sql;
        $result=$this->conn->query($this->sql);
        return $result;
    }

    // 返回插入的数据的id
    public function getInsertID(){
       return mysql_insert_id($this->conn);
    }
    // 返回所有的 数据
    public function getAll($sql){
        try{
            $result=$this->exec($sql);
            return $result->fetch_all(MYSQL_ASSOC);
        }catch(PDOException $e){
            echo "数据库读取失败!".'<br>';
            echo "出错的sql语句:".$sql.'<br>';
            echo '出错信息:'.$e->getMessage().'<br>';
            exit;
        }
    }
    // 返回单条数据
    public function getRow($sql){
        try{
            $result=$this->exec($sql);
            return $result->fetch_assoc();
        }catch(PDOException $e){
            echo "数据库读取失败!".'<br>';
            echo "出错的sql语句:".$sql.'<br>';
            echo '出错信息:'.$e->getMessage().'<br>';
            exit;
        }
    }
    
}