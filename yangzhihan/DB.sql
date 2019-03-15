-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2018-12-31 16:17:29
-- 服务器版本： 10.1.37-MariaDB
-- PHP 版本： 5.6.39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `dbaiman`
--
CREATE DATABASE IF NOT EXISTS `dbaiman` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `dbaiman`;

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `ID` int(11) NOT NULL COMMENT '自身ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `province` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '省',
  `city` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '市',
  `county` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '区',
  `detail_address` longtext COLLATE utf8_bin NOT NULL COMMENT '详细地址',
  `name` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '收件人姓名',
  `phone` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '收货电话号码'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`ID`, `user_id`, `province`, `city`, `county`, `detail_address`, `name`, `phone`) VALUES
(3, 19, '福建省', '漳州市', '长泰县', '裕达新城苑7栋5单元203室', '杨洋', '18943264317'),
(6, 19, '湖北省', '黄冈市', '红安县', '清风苑小区收发处', '刘洋', ''),
(9, 1, '北京市', '北京城区', '朝阳区', '朝阳小区', '阳明', ''),
(11, 1, '山西省', '忻州市', '繁峙县', '继承清风', '温健茶', '18996425186'),
(12, 1, '江西省', '吉安市', '新干县', '金川镇新添寨2号102', '司马懿', '15326548659');

-- --------------------------------------------------------

--
-- 表的结构 `orderlist`
--

CREATE TABLE `orderlist` (
  `ID` int(11) NOT NULL COMMENT '自身ID',
  `u_id` int(20) NOT NULL COMMENT '用户ID',
  `order_allprice` float NOT NULL COMMENT '订单总价',
  `order_number` bigint(255) NOT NULL COMMENT '订单号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `orderlist`
--

INSERT INTO `orderlist` (`ID`, `u_id`, `order_allprice`, `order_number`) VALUES
(1, 1, 0, 2147483647),
(8, 1, 3378, 1546228717847),
(9, 1, 3378, 1546229538163),
(10, 1, 3498, 1546230018931),
(11, 1, 240, 1546230192912),
(12, 1, 333, 1546230703879),
(13, 1, 93, 1546230771319),
(14, 1, 30, 1546230793241),
(15, 1, 10000, 1546237985662),
(16, 1, 1364, 1546238090464),
(17, 1, 589, 1546238106907),
(18, 1, 60, 1546246016411),
(19, 1, 520, 1546247002150),
(20, 1, 30, 1546257775628);

-- --------------------------------------------------------

--
-- 表的结构 `order_detail`
--

CREATE TABLE `order_detail` (
  `ID` int(11) NOT NULL COMMENT '自身ID',
  `userid` int(30) NOT NULL COMMENT '用户id',
  `productid` int(30) NOT NULL COMMENT '商品id ',
  `number` int(30) NOT NULL COMMENT '商品数量',
  `allprice` int(50) NOT NULL COMMENT '商品总价'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `order_detail`
--

INSERT INTO `order_detail` (`ID`, `userid`, `productid`, `number`, `allprice`) VALUES
(26, 1, 0, 0, 0),
(27, 1, 0, 0, 0),
(29, 1, 0, 0, 682),
(32, 1, 17, 1, 93);

-- --------------------------------------------------------

--
-- 表的结构 `shopcart`
--

CREATE TABLE `shopcart` (
  `ID` int(11) NOT NULL COMMENT '自身ID',
  `user_id` int(30) NOT NULL COMMENT '用户ID',
  `product_id` int(11) NOT NULL COMMENT '商品ID',
  `product_num` int(30) NOT NULL COMMENT '商品数量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `shopimg`
--

CREATE TABLE `shopimg` (
  `ID` int(11) NOT NULL COMMENT '自身ID',
  `shopID` int(100) NOT NULL COMMENT '商品id',
  `url` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '图片地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `shoplist`
--

CREATE TABLE `shoplist` (
  `ID` int(11) NOT NULL COMMENT '自身ID',
  `name` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '商品名称',
  `type` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '商品分类',
  `scort` int(100) NOT NULL COMMENT '库存',
  `number` bigint(255) NOT NULL COMMENT '商品编号',
  `cost` float NOT NULL COMMENT '成本价',
  `selling` float NOT NULL COMMENT '售价',
  `description` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '商品描述',
  `shop_url` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '商品图片地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `shoplist`
--

INSERT INTO `shoplist` (`ID`, `name`, `type`, `scort`, `number`, `cost`, `selling`, `description`, `shop_url`) VALUES
(20, '我的漫画书', '漫画书', 1090, 1545966912759, 100, 320, '休闲时刻 消遣美好时光 整套 完整版', ''),
(21, 'Bag bag', '包', 2000, 1545967555895, 300, 520, '独家一份，纯手工制作，白搭 锦上添花', ''),
(22, '皮卡丘  动漫卡通   P卡球', '卡通贴', 123, 1546055012852, 20, 30, '好玩的   好看的   有缺的', ''),
(23, '水杯', '水杯', 123, 1546242345941, 120, 150, '#经典保温 好看精致【艾漫专卖】', ''),
(24, '【食玩】口袋妖怪 精灵养育球', '公仔玩具', 0, 1546254223058, 200, 237, '【1BOX】6個入り 【1パック】フィギュア+ガム1個+ミニシート入り 【素材】容器：透明アクリル樹脂', ''),
(25, '角落花园', '漫画书', 128, 1546256164690, 210, 287, '【食玩】角落生物 送花员（盒装6个入）', ''),
(26, 'Angel Beats!', '手办', 20, 1546256308624, 400, 681, 'Angel Beats! 立华奏 和服Ver.1/8比例手办完成品', ''),
(27, 'pitanui 霸穹', '公仔玩具', 20, 1546256469401, 122, 180, '【限定】pitanui 霸穹 封神演义 Q版毛绒玩偶挂件 太公望', ''),
(28, '《全职高手》', '笔记本', 500, 1546256564574, 0.1, 10, '《全职高手》-笔记本-叶修Q版王座款', ''),
(30, '机动战士高达', '包', 89, 1546256965559, 27, 90, '机动战士高达 夏亚专用主题图案零钱包', '');

-- --------------------------------------------------------

--
-- 表的结构 `shoptype`
--

CREATE TABLE `shoptype` (
  `ID` int(11) NOT NULL,
  `shop_types` varchar(50) COLLATE utf8_bin NOT NULL,
  `essay_name` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`ID`, `username`, `password`) VALUES
(1, '小小的我', 'y12345'),
(5, 'love me ', 'love123'),
(6, 'hello word ', 'l1ove123'),
(7, 'go go go ', 'o987654'),
(8, 'goboob', 'o987654'),
(9, '1', 'q23456'),
(10, 'xiao huyue', 'q$1234');

-- --------------------------------------------------------

--
-- 表的结构 `user_detail`
--

CREATE TABLE `user_detail` (
  `ID` int(11) NOT NULL COMMENT '自身ID ',
  `username` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `sex` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '性别',
  `email` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '邮箱',
  `birthday` date NOT NULL COMMENT '生日',
  `constellation` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '星座',
  `phonenum` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '手机号码',
  `blood` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '血型',
  `u_id` int(100) NOT NULL COMMENT '用户id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `user_detail`
--

INSERT INTO `user_detail` (`ID`, `username`, `sex`, `email`, `birthday`, `constellation`, `phonenum`, `blood`, `u_id`) VALUES
(1, '12', '女', '2', '0000-00-00', '1432', '124', 'A', 0),
(4, '我的漫画书', '男', '450535813@qq.com', '0000-00-00', '摩羯座', '18009452312', 'B', 13),
(5, '不怕输小姐姐', '女', '450535813@qq.com', '0000-00-00', '水瓶座', '18009442833', '0', 19),
(9, '不怕', '男', '2575459867@qq.com', '1993-01-01', '水瓶座', '16799208576', 'B', 19),
(11, '小小的我', '女', '450535813', '1993-02-14', '水瓶座', '18009442833', 'O', 0),
(15, '小小的我', '女', '450535813@qq.com', '1993-12-01', '摩羯座', '18009452345', 'O', 1);

--
-- 转储表的索引
--

--
-- 表的索引 `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `shopcart`
--
ALTER TABLE `shopcart`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `shopimg`
--
ALTER TABLE `shopimg`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `shoplist`
--
ALTER TABLE `shoplist`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `shoptype`
--
ALTER TABLE `shoptype`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`ID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID', AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `orderlist`
--
ALTER TABLE `orderlist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID', AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID', AUTO_INCREMENT=37;

--
-- 使用表AUTO_INCREMENT `shopcart`
--
ALTER TABLE `shopcart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID', AUTO_INCREMENT=59;

--
-- 使用表AUTO_INCREMENT `shopimg`
--
ALTER TABLE `shopimg`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID';

--
-- 使用表AUTO_INCREMENT `shoplist`
--
ALTER TABLE `shoplist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID', AUTO_INCREMENT=31;

--
-- 使用表AUTO_INCREMENT `shoptype`
--
ALTER TABLE `shoptype`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自身ID ', AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
