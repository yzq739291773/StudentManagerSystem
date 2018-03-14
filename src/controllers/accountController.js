'use strict'

/**
 *这个文件就是用来处理我们账号相关的逻辑(注册&登录)
 */

//导包
const fs = require('fs')
const path = require('path')
const captchapng = require('captchapng');

const databasemanager = require(path.join(__dirname,'../tools/databasemanager.js'))

//处理获取登录页面的方法
exports.getLoginPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../views/login.html'),(err,data)=>{
      res.setHeader("Content-Type","text/html;charset=utf-8")
      res.end(data)
    })
}

//返回验证码的图片给浏览器
exports.getVcodeImage = (req,res)=>{
      var vcode = parseInt(Math.random()*9000+1000)

      //讲验证码存储到专属的内容空间
      req.session.vcodeId = vcode

      //todo vcode 要在服务端存储起来
      var p = new captchapng(80,30,vcode); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 
 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}

//处理登录请求
exports.login = (req,res)=>{
  //1.获取post传递过来的参数(body-parser)
  const params = req.body
  //2.验证验证码
  const result = {status:0,message:"登录成功"}
  if (parseInt(params.vcode)!=req.session.vcodeId) {
      result.status = 1
      result.message = "验证码错误"

      //返回json格式的数据给浏览器
      res.json(result)
      
      return;
  }

  //3.验证用户名和密码
  databasemanager.findOne('account',{username:params.username,password:params.password},(err,doc)=>{
        if (doc==null) {
            result.status = 2
            result.message = "用户名或是密码错误"
        }
        //最终返回的结果
        res.json(result)
  })
}
