const express = require('express')
const weather = require('./../lib/weather/getweather')
const send_email = require('./../lib/send_email/index')


var router = express.Router()//创建路由容器

//把路由挂载到 router 容器
router.get('/', (req, res) => {
    // console.dir(req)
    console.dir(req.session.islogin);//true
    res.send(`使用 express!<br/> 
    <a href="/public">模板引擎</a> <br/> 
    <a href="/weather">通过读取文件查询</a> <br/> 
    <a href="/api/weather">根据参数查询</a> <br/>
    <a href='/sendemail'>Send_Email</a>
    `)
})


router.get('/public', (req, res) => {
    req.session.islogin = true;
    res.render('index.html', {  //<h1>{{title}}</h1>
        title: "art-template 模板引擎"
    })
})


//获取psot 数据
router.post('/post', function (req, res) {
    console.dir(req.body);
    res.redirect("/")//重定向到指定界面
})


//获取天气预报 
router.get('/api/weather', function (req, res) {
    console.dir(req.query.city);
    if (req.query.city != null) {
        if (req.query.city > weather.city.length) {
            weather.GetData(res, 'http://t.weather.sojson.com/api/weather/city/' + weather.city[178 - 1].city_code)
        }
        else {
            weather.GetData(res, 'http://t.weather.sojson.com/api/weather/city/' + req.query.city)
        }
    }
    else {
        weather.GetData(res, 'http://t.weather.sojson.com/api/weather/city/' + weather.city[178 - 1].city_code)
    }
})


//获取天气预报 
router.get('/weather', function (req, res) {
    weather.weatherDB(res, "./weatherDB.json")
})

setTimeout(function () {
    weather.GetData(null, 'http://t.weather.sojson.com/api/weather/city/' + weather.city[178 - 1].city_code)
}, 3 * 60 * 60 * 1000);


//sendEmail
router.get('/sendemail', function (req, res) {
    send_email.main()
    res.send("邮件已发送")
})



module.exports = router//导出 router