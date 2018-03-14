'use strict'

//导包
const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')

//创建app
const app = express()

//集成静态资源中间件
app.use(express.static(path.join(__dirname,'statics')))

// 获取post参数parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware 
// 参数1：安全相关
// 参数2：就是分配的那块内存的最长有效期，一般性的网站不超过30网站
// 银行性网站:2分钟以下，单位毫秒
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//集成路由(放在最后，在启动web服务之前即可)
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)

const studentManagerRouter = require(path.join(__dirname,'routers/studentmanagerRouter.js'))
app.use('/studentmanager',studentManagerRouter)

//开启web服务
app.listen(3000,'127.0.0.1',(err)=>{
  if (err) {
    console.log(err)
  }
  console.log("start OK")
})
