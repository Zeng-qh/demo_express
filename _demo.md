# express  http://www.expressjs.com.cn/
保存代码自动重启 npm install -g nodemon
使用 nodemon app.js
next() 用来调用下一个中间件

```JS
// # 初始化：
// npm init
// npm install express --save

const express = require('express')
const app = express()
app.get('/', (req, res) => {
    console.dir(req)
    res.send('使用 express!')
})
app.listen(3000, () => console.log('http://127.0.0.1:3000/'))
```


## 静态资源访问
```JS
// app.use('/express/public', express.static('NodeCode/express/public'))  //相对路径 http://127.0.0.1:3000/express/public/index.html
// app.use('/express/public', express.static('E:\\allnode\\MyCode\\build\\JavaScript\\NodeJS\\NodeCode\\express\\public')) //绝对路径

// app.use('/public', express.static('/public'))//http://127.0.0.1:3000/public/index.html  根据文件路径的形式
// app.use('/test',express.static('./public'))  //http://127.0.0.1:3000/test/index.html  别名的形式 
// app.use(express.static('./public')) //http://127.0.0.1:3000/index.html   直接访问资源的形式
```
## Express art-template 模板引擎
```js 
// cnpm install --save art-template express-art-template 
const express = require('express')
const app = express()
app.engine('html', require('express-art-template'));  // art-template模板引擎 art 修改为html
app.set('views','public')//修改默认路径
app.get('/', (req, res) => {  
    res.render('index.html',{  //<h1>{{title}}</h1>
        title:" art-template 模板引擎"
    })
})
```

## Express 获取Post 数据 获取Get 数据 req.query
``` sh
cnpm install body-parser --save 
```
```js
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/post',function (req,res) {
    console.dir(req.body);  
    // Array.unshift("")//把一个元素添加到数组的开头，并返回数组的新长度。
    res.redirect("/")//重定向到指定界面
})
```


## Session Cookie
```js
// npm i express-session
const session=require('express-session')

//路由之前
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,//修改为false
    // cookie: { secure: true }
  }))


//login 
req.session.islogin=true;
res.redirect("/")//重定向到指定界面

// '/'
console.dir(req.session.islogin);//true
```

## 添加天气API 
使用   superagent   Node.js和浏览器的Ajax（JS HTTP客户端） https://github.com/visionmedia/superagent

## SendEmail
使用  nodemailer  发送电子邮件  https://github.com/nodemailer/nodemailer