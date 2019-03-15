<?php
// 控制器基类
class Controller{
    protected $_controller;
    protected $_action;
    // protected $_view;
    public function __construct($_controller,$_action){
        $this->_controller=$_controller;
        $this->_action=$_action;
    }
}