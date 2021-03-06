const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const compression=require('compression') // 开启gzip
const router = require("./routers/index")

const app = express()

let WhitList = ['http://127.0.0.1:5500','http://localhost:8080/']//允许那些可以访问
app.use(function (req, res, next) { //跨域问题
    let origin = req.headers.origin
    if (WhitList.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin)//设置源  
    }
    // res.setHeader("Access-Control-Allow-Origin", '*')//设置源 
    // res.setHeader("Access-Control-Allow-Methods", "*");//允许访问的方式
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type:application/json;");
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

// app.get('/', (req, res) => {
//     console.dir(req)
//     res.send('使用 express!')
// })

app.use(compression())
app.use("/public", express.static("./public")) // http://127.0.0.1:3000/public/static/city.json

//静态资源 访问
// app.use('/express/public', express.static('NodeCode/express/public'))  //相对路径 http://127.0.0.1:3000/express/public/index.html
// app.use('/express/public', express.static('E:\\allnode\\MyCode\\build\\JavaScript\\NodeJS\\NodeCode\\express\\public')) //绝对路径

// app.use('/public', express.static('/public'))//http://127.0.0.1:3000/public/index.html  根据文件路径的形式
// app.use('/test',express.static('./public'))  //http://127.0.0.1:3000/test/index.html  别名的形式 
// app.use(express.static('./public')) //http://127.0.0.1:3000/index.html   直接访问资源的形式


app.engine('html', require('express-art-template'));  // art-template模板引擎 art 修改为html
app.set('views', 'public')//修改默认路径

app.use(bodyParser.urlencoded({ extended: false }))  // 获取Post 数据   获取Get数据使用req.query
app.use(bodyParser.json())


//  Session
//路由之前  
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,//修改为false
    // cookie: { secure: true }
}))



app.use(router)//路由容器挂在到 app 服务中

app.listen(3000, () => console.log('http://127.0.0.1:3000/'))