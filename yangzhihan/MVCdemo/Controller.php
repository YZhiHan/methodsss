<?php
class Controller{
    protected $_controller;
    protected $_action;

    public function __construct($_controller,$_action)
    {
        $this->_controller=$_controller;
        $this->_action=$_action;
    }
}