<?php
// $_GET['c'];//Book
// $_GET['a'];//update
// require_once './../application/User/Controller/UserController.php';
// $userCon=new UserControl();
// $userCon->add();

class CorePHP{
    protected $config;
    public function __construct($conf){
        $this->config=$conf;
    }   
    // 运行程序
    public function run(){ 
        // 自动注册类方法
        spl_autoload_register(array($this,'loadClass')); 
        $this->setDBconfig();
        // 路由分发
        // require('./core/Sql.php');
        // require('./core/Model.php');
       $this->loadFrameClass();
        $this->router();
    }
    // 路由
    public function router(){
        // 根据url 地址中的 c 和 a
        // c: 控制器  a:action 方法（具体要执行的操作，例如，增加，删除，改，查）
        $cName=$_POST['c'];
        $aName=$_POST['a'];
        // 根据url 参数拼接 类名称
        $controlClassName=$cName.'Controller';
        
        // 判断控制器 和方法 是否存在
        if(!class_exists($controlClassName)){
            exit($controlClassName.'控制器不存在！');
        }
        if(!method_exists($controlClassName,$aName)){
            exit($aName.'方法不存在！');
        }
        // 实例化控制器
        $controlObj=new $controlClassName();
        $controlObj->$aName();//调用操作方法（action）
        // c:user; a:add
        // $controlName=c.'Control';
        // $control=new $controlName;
        // $control->a();
    }
    // 定义配置信息 
    public function setDBconfig(){
        if($this->config['db']){
            foreach($this->config['db'] as $k=>$v){
                define($k,$v);
            } 
        }
    }

    //加载框架主体类
    public function loadFrameClass(){
        include APP_PATH.'core/Sql.php';
        include APP_PATH.'core/Model.php';
    }


    //自动加载控制器和模型类
    public function loadClass($class){
        // 加载控制器
        $controllers=APP_PATH.'application/Controllers/'.$class.'.php';
        // 加载模型类
        $models=APP_PATH.'application/Models/'.$class.'.php';
        if(file_exists($controllers)){
            include $controllers;
        }else if(file_exists($models)){
            include $models;
        }
    }
}