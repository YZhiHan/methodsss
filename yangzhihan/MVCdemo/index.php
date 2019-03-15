<?php
// 入口文件

// 项目的根目录
define('APP_PATH',__DIR__.'/');

// 加载配置文件
// $config=require(APP_PATH.'config/config.php');
$config['db']['HOST_NAME']='localhost';
$config['db']['DB_USERNAME']='root';
$config['db']['DB_PASSWORD']='';
$config['db']['DB_NAME']='dbaiman';
$config['db']['DB_CHARSET']='utf8';
 
// 引入核心框架文件
require(APP_PATH.'core/core.php');
$core=new CorePHP($config);
$core->run();