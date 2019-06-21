var express = require('express');
var router = express.Router();


/*--- 验证token --- 开始 */ 
const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/checklogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
})
/*--- 验证token -- 结束 ---*/ 



//统一设置请求头
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
    next()//放行
})
//引入数据库连接
const connection = require('./js/coon');


//商品添加
router.post('/goodsadd',(req,res)=>{
	//接收参数
	let {categoryThe, barCode, goodsName, goodsPurchasing, goodsNum, marketPrice, storageNum, goodsWeight, goodsUnit, discounts, promotion, goodsBrief} = req.body;
	//准备sql.
	const sqlStr = `insert into goods(categoryThe, barCode, goodsName, goodsPurchasing, goodsNum, marketPrice, storageNum, goodsWeight, goodsUnit, discounts, promotion, goodsBrief) values(?,?,?,?,?,?,?,?,?,?,?,?)`

	//参数
	const sqlParams = [categoryThe, barCode, goodsName, goodsPurchasing, goodsNum, marketPrice, storageNum, goodsWeight, goodsUnit, discounts, promotion, goodsBrief];
	//执行sql
	connection.query(sqlStr,sqlParams,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,msg:'商品添加成功'})
		}else{
			res.send({code:1,msg:'商品添加失败'})
		}
	})
})

//商品列表
// router.get('/goodslist',(req,res)=>{
// 	//准备sql
// 	const sqlStr = `select * from goods order by ctime desc`
// 	//执行sql
// 	connection.query(sqlStr,(err,data)=>{
// 		if(err) throw err;
// 		res.send({data})
// 	})
// })

//分页
router.get('/goodsList',(req,res)=>{
	//接收参数
	let {currentPage,pageSize,categoryThe,bacCode} = req.query;

	let sqlStr = `select * from goods where 1=1`;

	//定义变量保存总条数
	let total;

	//如果分类不等于空 且 不等于全部
	if(categoryThe !== '' && categoryThe !== '全部分类'){
		//拼接第一个查询条件
		sqlStr += ` and categoryThe = '${categoryThe}'`;
	}

	//如果第二个关键字不为空那么就拼接sql
	if(bacCode !== ''){
		sqlStr += ` and (goodsName like '%${bacCode}%' or barCode like '%${bacCode}%')`;
	}

	//准备sql
	 sqlStr += ` order by ctime desc`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		total = data.length;
	})

	//构造sql
	let n = (currentPage - 1) * pageSize;
	sqlStr+= ` limit ${n},${pageSize}`
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send({total,data})
	})
})


//删除
router.get('/goodsdelete',(req,res)=>{
	//接收id
	let {id} = req.query;

	//准备sql
	const sqlStr = `delete from goods where id = ${id}`;
	console.log(sqlStr)
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,msg:'信息删除成功'})
		}else{
			res.send({code:1,msg:'信息删除失败'})
		}
	})
})

//批量删除
router.get('/goodbatches',(req,res)=>{
	//获取id
	let {id} = req.query;
	//准备sql
	const sqlStr = `delete from goods where id in (${id})`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,msg:'批量删除成功'})
		}else{
			res.send({code:1,msg:'批量删除成功'})
		}
	})
})

//商品编辑
router.get('/goodeditor',(req,res)=>{
	//接收id
	let {id} = req.query;
	//准备sql
	const sqlStr = `select * from goods where id=${id}`
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send({data})
	})
})

//保存修改
router.post('/goodsedit',(req,res)=>{
	//接收参数
	let {barCode,goodsName,categoryThe,goodsNum,promotion,id} = req.body;
	//准备sql
	const sqlStr = `update goods set barCode='${barCode}',goodsName='${goodsName}',categoryThe='${categoryThe}',goodsNum='${goodsNum}',promotion='${promotion}' where id=${id}`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,msg:'数据修改成功'})
		}else{
			res.send({code:1,msg:'数据修改失败'})
		}
	})
})


//数据统计表
router.get('/getselldata',(req,res)=>{
	res.send({
		category:['19-06-30', '19-07-1', '19-07-2', '19-07-03', '19-07-04', '19-07-05', '19-07-06'],
		value:  [1000, 1500, 8001, 2434, 2000, 1330, 3300]
	})
})

//商品查询
// router.get('/fuzzysearch',(req,res)=>{
// 	//接收参数
// 	let {categoryThe,bacCode} = req.query;
// 	//构造sql
// 	let sqlStr = `select * from goods where 1=1`;
	
// 	//如果分类不等于空 且 不等于全部
// 	if(categoryThe !== '' && categoryThe !== '全部分类'){
// 		//拼接第一个查询条件
// 		sqlStr += ` and categoryThe = '${categoryThe}'`;
// 	}

// 	//如果第二个关键字不为空那么就拼接sql
// 	if(bacCode !== ''){
// 		sqlStr += ` and (goodsName like '%${bacCode}%' or barCode like '%${bacCode}%')`;
// 	}

// 	//执行sql
// 	connection.query(sqlStr,(err,data)=>{
// 		if(err) throw err;
// 		res.send({data})
// 	})
// })
//暴露
module.exports = router;