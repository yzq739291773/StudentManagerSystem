'use strict'

//导包
const express = require('express')
const path = require('path')

//创建accountRouter
const  accountRouter = express.Router()

//导入控制器，将一些比较繁琐的业务逻辑处理交给控制器
const accountCtrl = require(path.join(__dirname,'../controllers/accountController.js'))

//处理二级路由
//返回登录页面
accountRouter.get('/login',accountCtrl.getLoginPage)
//返回图片验证码
accountRouter.get('/vcode',accountCtrl.getVcodeImage)
//登录逻辑
accountRouter.post('/login',accountCtrl.login)

//最后导出accountRouter在入口文件中使用
module.exports = accountRouter
