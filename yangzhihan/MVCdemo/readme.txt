按照项目模块划分

1.用户模块
2.文章模块
3.文章类型模块

按照体系架构 mvc 架构
Controller
Model
View（public）

//规范
1.目录文件使用驼峰命名

整个项目目录结构
application//应用程序目录
  1.controllers 控制器目录
        UserController.class.php
        ArticleController.class.php
        ArticleTypeController.class.php
    models   模块目录
        UserModel.class.php
        ArticleModel.class.php
        ArticleTypeModel.class.php
  2.User
        Controller
            UserController.php
        Model
            UserModel.php
    Article
        Controller
            ArticleController.php
        Model
            ArticleModel.php

    ArticleType
    
core //核心目录
config //配置信息
    db_config.php //
public //view 视图页面
    static// 静态资源目录
uploads //上传文件的目录


MVC  
降低代码耦合度