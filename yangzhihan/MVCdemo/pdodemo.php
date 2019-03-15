<?php
const DBNAME="mysql";
const SQLIP = "localhost";
const SQLNAME = "root";
const SQPPWD = "";
const MYDB = "dbaiman";
$dsn= DBNAME.":host=".SQLIP.";dbname=".MYDB;
try{
    $db = new PDO($dsn,SQLNAME,SQPPWD); //初始化一个PDO对象
    echo "连接成功<br/>";
    $db->query("set names utf8");
    foreach ($db->query('SELECT * from user') as $row) {
        print_r($row); //你可以用 echo($GLOBAL); 来看到这些值
    }
    $db=null;
}catch(PDOException $e){
    die ("Error!: " . $e->getMessage() . "<br/>");
}
?>