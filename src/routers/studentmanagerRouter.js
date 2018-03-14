'use strict'

const express = require('express')
const path = require('path')

//创建studentManagerRouter
const  studentManagerRouter = express.Router()

//二级路由的处理，并且将具体处理的业务逻辑交给控制器
const studentManagerCtrl = require(path.join(__dirname,'../controllers/studentManagerController.js'))

//获取学生列表页面
studentManagerRouter.get('/list',studentManagerCtrl.getStudentListPage)
//获取新增学生页面
studentManagerRouter.get('/add',studentManagerCtrl.getAddStudentPage)
//新增学生
studentManagerRouter.post('/add',studentManagerCtrl.addStudent)

module.exports = studentManagerRouter
