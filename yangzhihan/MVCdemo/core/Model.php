<?php
// 模型基类
class Model {
    protected $dao;
    protected $table;
    protected $table2;
    protected $fields = []; //表字段
    public function __construct($table,$table2 = null)
    {
       $this->dao=new Sql;
       $this->table=$table;//表名称\
       $this->table2=$table2;//表名称
       $this->getFields();
    }

    /**
     * 获取表字段列表
     * @return [type] [description]
     */
    private function getFields()
    {
        $sql = "DESC {$this->table}";
        $data = $this->dao->getAll($sql);
        //遍历数据, 给fields数组追加元素
        foreach ($data as $v){
            $this->fields[] = $v['Field'];
            //取出主键的字段
            if ($v['Key'] == 'PRI'){
                $pk = $v['Field'];
            }
        }
        if (isset($pk)){
            $this->fields['pk'] = $pk;
        }
    }
    
/**
     * 添加操作
     * @param  [array] $list [需要添加的数据]
     *                       eg. ['name'=>'xiaoming', 'age'=>20]
     * @return [type]       [description]
     */
    public function insert($list)
    {
        $field_list = ''; //字段列表
        $value_list = ''; //值列表

        //遍历构建字段列表/值列表
        foreach ($list as $k=>$v){
            if (in_array($k, $this->fields)){
                $field_list .= "{$k},";
                $value_list .= "'{$v}',";
            }
        }
        //var_dump($field_list, $value_list);

        //去掉最后面的逗号
        $field_list = rtrim($field_list, ',');
        $value_list = rtrim($value_list, ',');
        //var_dump($field_list, $value_list);

        // INSERT INTO `表名` (字段列表) VALUES (值列表)
        // INSERT INTO `user` (name, age) VALUES ('xiaoming', '20')
        $sql = "INSERT INTO `{$this->table}` ({$field_list}) VALUES ({$value_list})";
        //echo $sql;exit;
        //执行sql语句
        return $this->dao->exec($sql);
    }

    /**
     * 更新操作
     * @param  [array] $list [需要更新的数据, 注意必须有主键字段]
     *                       eg. ['id'=>4, 'name'=>'xiaomei-new']
     * @return [type]       [description]
     */
    public function update($list)
    {
        $uplist = '';
        $where = '';
        foreach ($list as $k=>$v){
            if (in_array($k, $this->fields)){
                if ($k == $this->fields['pk']){
                    //主键字段, 构造where条件
                    $where = "{$k}=$v";
                }else{
                    //非主键字段, 构造uplist(字段列表)
                    $uplist .= "{$k}='{$v}',";
                }
            }
        }

        //去掉最右边的逗号
        $uplist = rtrim($uplist, ',');

        // UPDATE 表名 SET 字段1=值1, 字段2=值2 WHERE 条件
        // UPDATE `user` SET name='xiaomei-new', age='19' WHERE id=4
        $sql = "UPDATE `{$this->table}` SET {$uplist} WHERE {$where}";
        return $this->dao->exec($sql);
        // echo $sql;
    }

    /**
     * 删除操作
     * @param  [mix] $pk [需要删除的记录的主键]
     *                   eg. [1,2,3]是一个数组
     *                       4: 是一个单值
     * @return [type]     [description]
     */
    public function delete($pk)
    {
        //定义where条件
        $where = '';
        if (is_array($pk)){
            $str = implode(',', $pk);
            $where = "{$this->fields['pk']} in ({$str})";
        }else{
            $where = "{$this->fields['pk']}={$pk}";
        }
        $sql = "DELETE FROM `{$this->table}` WHERE {$where}";
        return $this->dao->exec($sql);
        // echo $sql;
    }

    /**
     * 查询所有记录
     * @return [type] [description]
     */
    public function select()
    {
        $sql = "SELECT * FROM {$this->table}";
        return $this->dao->getAll($sql);
    }

    /**
     * 根据主键id查询单条记录
     * @param  [type] $pk [description]
     * @return [type]     [description]
     */
    public function selectByPk($pk)
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->fields['pk']}={$pk}";
        return $this->dao->getRow($sql);
    }

    /**
     * 获取分页记录
     * @param  [int] $offset [偏移量]
     * @param  [int] $limit  [长度]
     * @return [type]         [description]
     */
    public function pageData($offset, $limit)
    {
        $sql = "SELECT * FROM {$this->table} LIMIT {$offset}, {$limit}";
        return $this->dao->getAll($sql);
    }
// 多表联查 prodect_detail---address
    public function selectMore(){
     $sql="SELECT a.name,a.phone,a.province,a.county,a.city,a.detail_address,b.order_allprice,b.order_number,b.product_id,b.product_num FROM  `{$this->table}` as a JOIN `{$this->table2}` as b ON a.ID = b.address_id";
     return $this->dao->getAll($sql);
    }
    // 多表联查 user---userinfor
    public function selectMoreuser(){
        $sql="SELECT a.username,a.islogin,b.phonenum,b.birthday,b.sex,b.blood,b.constellation,b.u_id  FROM  `{$this->table}` as a LEFT JOIN `{$this->table2}` as b ON a.ID = b.u_id";
        return $this->dao->getAll($sql);
        // var_dump($sql);
       }
}