##express
###基于 Node.js 平台，快速、开放、极简的 web 开发框架。
###安装模块
>**$ npm install express --save**

###路由
>路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

>路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

#####下面是一个基本的路由示例：
	var express = require('express');
	var app = express();
	
	// respond with "hello world" when a GET request is made to the homepage
	app.get('/', function(req, res) {
	  res.send('hello world');
	});

#####express.Router
>下面的例子：在api这个文件夹下有index.js这个文件；

	var express = require('express');
	var router = express.Router();
	...
	module.exports = router;

>在app.js这个文件中加载路由模块
	
	const userApi = require('./api/index.js');
	app.use('/api',userApi) //加载这个模块


###使用中间件
>Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

>中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

#####中间件的功能包括：
>执行任何代码。
>
>修改请求和响应对象。
>
>终结请求-响应循环。
>
>调用堆栈中的下一个中间件。

######应用级中间件

	var app = express();

	// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
	app.use(function (req, res, next) {
	  console.log('Time:', Date.now());
	  next();
	});
	
	// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
	app.use('/user/:id', function (req, res, next) {
	  console.log('Request Type:', req.method);
	  next();
	});
	
	// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
	app.get('/user/:id', function (req, res, next) {
	  res.send('USER');
	});

#####利用 Express 托管静态文件
>通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

>将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

>**app.use(express.static('public'));**


###app.js文件中

	let express = require('express');// expres是一个函数
	let app = express(); // 得到一个对象
	let bodyParser = require('body-parser')//响应前端请求时post请求的数据
	
	// console.log(__dirname);  // 得到当前运行的js文件所在的绝对路径
	// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
	
	
	//--------------------------------------------------------上传的配置
	const multer  = require('multer');  // 处理上传的模块
	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, __dirname+'/uploads/'); // 设置存储的位置
	  },
	  filename: function (req, file, cb) {
	    cb(null, file.originalname); //存储文件的名字
	  }
	})
	var upload = multer({ storage }); // 指定上传的信息
	
	//-------------------------------模板引擎
	let swig = require('swig');// 用到模板引擎，把index.html作为模板
	app.set('views', './views'); // 设置模板存放的位置 在views这个文件夹下
	app.engine('html', swig.renderFile)// 定义模板引擎使用swig.renderFile这个函数渲染，同时后缀名为html
	app.set('view engine', 'html')// 注册模板引擎，views目录下的以html为后缀的模板都用swig.renderFile渲染
	
	
	//中间件
	app.use(express.static('./publish'))// 设置静态文件的目录
	
	
	//-----------------------------解析post数据的配置
	app.use(bodyParser.json());  // 客户端发送过来的json格式
	app.use(bodyParser.urlencoded({ extended: true })); // 解析客户端发送的key=value&key=value
	// app.use(multer()); // for parsing multipart/form-data
	
	
	// 写上路径，是特定的额路径触发这个中间件
	/*app.use(function(req,res,next){
	  console.log('hello,中间件')
	  //res.send('hi')
	  next()
	})*/
	app.use(function(req,res,next){
	  // console.log('hello,中间件1')
	  // //res.send('hi')
	  // next()
	  let mustLogin = ['/miaov','/a',"/b"];
	
		if(mustLogin.includes(req.url)){
			if(true){ // 没登录
				res.redirect('/login') //redirect重定向
			}else{
				next();	
			}
		}else{
			next();	
		}
	
	})
	
	//用模板引擎向前端返回页面
	let user = {
	  name:'momo',
	  age:20,
	  sex:'男'
	}
	app.get('/',(req,res) => {
	  // console.log('有请求来了');
	  // res.status(200);
	  // res.send('响应了')
	  //res.sendFile(__dirname+'/views/index.html')
	  res.render('index',{
	    user:user,
	    list:[1,2,3,4]
	  })
	})
	
	app.get('/miaov',(req,res) => {
	  if(true){
	    res.redirect('/login')
	  }else{
	    res.sendFile(__dirname+'/views/miaov.html')
	  }
	
	})
	app.get('/ketang',(req,res) => {
	  res.sendFile(__dirname+'/views/ketang.html')
	
	})
	app.get('/login',(req,res) => {
	  res.sendFile(__dirname+'/views/login.html')
	
	})
	
	//引入api这个文件夹下的index.js
	const userApi = require('./api/index.js');
	app.use('/api',userApi) //加载这个模块
	
	
	// APi用来做上传的   miaov要与from表单中的name保持一致
	app.post('/upload',upload.single('miaov'), (req, res) => {
		res.send('上传ok')
	})
	
	// app.listen('3000',()=>{
	//   console.log('haha')
	// })	
	
	//-----------------------------启动时端口和ip配置
	/*app.listen(port[,host,callback])*/
	//http://192.168.0.104:3000/
	let host = '192.168.0.104';
	let port = 3000;
	app.listen(port,host,()=>{
	  console.log('http://'+host+':'+port) 
	})


###api文件的index.js中

	const express = require('express');
	const router = express.Router();
	
	//响应前端的请求
	
	//http://localhost:3000/api/users 页面中 可以看到 {"code":0,"message":"ok"}
	router.get('/users',(req,res) => {  
	  //获取get请求的数据
	  console.log(req.query)
	
	  let {random,userName} = req.query; //解构赋值
	  console.log(random)
	  console.log(userName)
	
	  res.send({
	    code:0,
	    message:'ok'
	  })
	})
	
	//post在地址栏中输/api/post-users不会再页面中响应{"code":0,"message":"hello,world"}
	//在netWork中Response中查看
	router.post('/post-users',(req,res) => {
	  console.log(req.body)
	
	  let {userName} = req.body;
	  console.log(userName)
	
	  res.send({
	    code:0,
	    message:'hello,world'
	  })
	
	})
	
	module.exports = router;


###index.html中

	<!DOCTYPE html>
	<html lang="en">
	  <head>
	    <title></title>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <link rel="stylesheet" href="./css/css.css">
	     <!-- <script src="./js/index.js"></script>  -->
	    <script src="./js/jquery-3.2.1.js"></script>
	
	    node_modules
	  </head>
	  <body>
	    <a href="/miaov">miaov</a>
	    <a href="/ketang">ketang</a>
	
	    首页
	
	    <input type="button" value="get数据" id="getBtn" />
	    <input type="button" value="post数据" id="postBtn" />
	    <form method="post" action="/upload" enctype='multipart/form-data'>
				<input type="file" name="miaov">
				<input type="submit"  value="上传" />
			</form>
	    <hr/>
	    <h2>信息</h2>
	    <ul>
	      <li>{{user.name}}</li>
	      <li>{{user.sex}}</li>
	      <li>{{user.age}}</li>
	    </ul>
	    {% for item,index in list %}
	      <a href="">{{item}}</a>
	      {% if index === 1 %}
	        <p>hello{{index}}</p>
	      {% endif %}
	    {% endfor %}
	
	    <script>
	      //ajax向后端发送请求
	      $('#getBtn').click(function(){
	        $.ajax({
	          url:'/api/users?random='+Math.random()+"&userName=leo",
	          method:'get',
	          success(data){
	            // 后端发送的是json的格式，jq会帮你转成对象的形式
	            console.log(typeof data) //Object
	          }
	        })
	      })
	      $('#postBtn').click(function(){
	        $.ajax({
	          url:'/api/post-users',
	          method:'post',
	          data:{
	            userName: 'leo'
	          },
	          success(data){
	            // 后端发送的是json的格式，jq会帮你转成对象的形式
	            console.log(typeof data)
	          }
	        })
	      })
	    </script>
	  </body>
	</html>