var express = require('express');
var router = express.Router();

//引入数据库连接
const connection = require('./js/coon');

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


// router.get('/',(req,res)=>{
//     res.send('测试数据')
// })

//添加账号
router.post('/accountadd',(req,res)=>{
    //接收参数
    let {account,password,userGroup} = req.body;
    //准备sql
    const sqlStr = `insert into accounts(account, password, userGroup) values('${account}', '${password}', '${userGroup}')`;
    console.log(sqlStr)
    //执行sql
    connection.query(sqlStr,(err,data)=>{
    	if (err) throw err;
    	console.log(data);
    	//判断
    	if(data.affectedRows>0){
    		res.send({code:0,msg:'添加账号成功'})
    	}else{
    		res.send({code:0,msg:'添加账号失败'})
    	}
    })
})

//账号列表
router.get('/accountlist',(req,res)=>{
	//准备sql
	const sqlStr = `select * from accounts order by ctime desc`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		// res.send('1')
		res.send({data});//响应数据给前端
	})
})

//单条删除账号
router.get('/accountdel',(req,res)=>{
	//接收参数
	let {id} = req.query;
	//准备sql
	const sqlStr = `delete from accounts where id=${id}`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows > 0){
			res.send({code:0,msg:'删除成功'})
		}else{
			res.send({code:1,msg:'删除失败'})
		}
	})
})
	
//修改功能
router.get('/accounteditor',(req,res)=>{
	//接收id
	let {id} = req.query;
	//准备sql
	const sqlStr = `select * from accounts where id=${id}`
	// console.log(sqlStr)
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send({data})
	})
})

//保存修改
router.post('/accountedit',(req,res)=>{
	//接收参数
	let {account,userGroup,id} = req.body;
	//准备sql
	const sqlStr = `update accounts set account='${account}',userGroup='${userGroup}' where id=${id}`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,msg:"账号修改成功"})
		}else{
			res.send({code:1,msg:"账号修改失败"})
		}
	})
})


//批量删除
router.get('/batchdelete',(req,res)=>{
	// //接收id
	let {idArr} = req.query;
	// //构造sql
	const sqlStr = `delete from accounts where id in (${idArr})`;
	// //执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,msg:'批量删除成功'})
		}else{
			res.send({code:1,msg:'批量删除失败'})
		}
	})
})

//分页
router.get('/accountpage',(req,res)=>{
	//接收参数
	let {pageSize,currentPage} = req.query;

	//定义变量，保存总数据
	let total;
	//准备sql
	let sqlStr = `select * from accounts order by ctime desc`
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		total = data.length;//获取数据的总条数
	})

	//构造sql
	let n = (currentPage - 1) * pageSize ;//跳过多少条
	sqlStr+= ` limit ${n},${pageSize}`;//分页的sql

	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send({total,data});//把总数据条数和当前页码对应的数据响应给前端
	})

})


//原密码
router.post('/oldpassword',(req,res)=>{
	//获取密码
	let {oldPass} = req.body;
	console.log(req.user)
	//验证是否正确
	if(oldPass===req.user.password){
		res.send({code:0,msg:'原密码正确'})
	}else{
		res.send({code:1,msg:'原密码错误'})
	}
})

//修改密码
router.post('/revamppass',(req,res)=>{
	//接收新密码
	let {rawPass} = req.body;
	//取出ID
	let id = req.user.id;
	//准备sql
	const sqlStr = `update accounts set password = '${rawPass}' where id=${id}`;

	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows > 0 ){
			res.send({code:0,msg:'密码修改成功'})
		}else{
			res.send({code:1,msg:'密码修改失败'})
		}
	})
})

//用户信息
router.get('/getinfo',(req,res)=>{
	//接收id
	let id = req.user.id;
	//准备sql
	const sqlStr = `select * from accounts where id=${id}`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send({data})
	})
})

//权限管理
router.get('/role',(req,res)=>{
	res.send({role:req.user.userGroup})
})
//暴露
module.exports = router;