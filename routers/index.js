const express = require('express')

var router = express.Router()//创建路由容器

//把路由挂载到 router 容器
router.get('/', (req, res) => {
    // console.dir(req)
    console.dir(req.session.islogin);//true
    res.send('使用 express!<br/> <a href="/public">模板引擎</a>')
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

module.exports = router//导出 router