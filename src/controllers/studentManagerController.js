'use strict'

//导入xtpl
const xtpl = require('xtpl')
const path = require('path')

const databasemanager = require(path.join(__dirname,'../tools/databasemanager.js'))

exports.getStudentListPage = (req,res)=>{
    //获取参数
    //关键字
    const keyword = req.query.keyword || ''
    //每页多少条
    const everyPageCount = parseInt(req.query.everyPageCount || '2')

    //分页的处理
    const currentPageIndex = parseInt(req.query.currentPageIndex || '0')
    const skipCount = currentPageIndex * everyPageCount

    //获取总个数
    databasemanager.getCount('student_info',{name:{$regex:keyword}},(err,totalCount)=>{
         //计算总页数
         const totalPage = totalCount % everyPageCount == 0 ? totalCount / everyPageCount : parseInt(totalCount / everyPageCount) + 1

         //把总页数拼凑成一个数组，然会给页面去显示页码
         //3  [0,1,2] //拼凑我们的页码数组
         const pageArray = []
         for(var i=0;i<totalPage;i++){
            pageArray.push(i)
         }

         //2.去数据库中查询所有学生列表
        databasemanager.findList('student_info',{name:{$regex:keyword}},skipCount,everyPageCount,(err,docs)=>{
            //拿到了数据，再去渲染页面
            xtpl.renderFile(path.join(__dirname,'../views/list.html'),{array:docs,keyword:keyword,pageArray:pageArray,currentPageIndex:currentPageIndex,totalPage:totalPage},(err,content)=>{
                res.setHeader("Content-Type","text/html;charset=utf-8")
                res.end(content)
            })
        })
    })
}

//返回我们的新增学生页面
exports.getAddStudentPage = (req,res)=>{
    xtpl.renderFile(path.join(__dirname,'../views/add.html'),(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8")
        res.end(content)
    })
}

//新增学生
exports.addStudent = (req,res)=>{
    databasemanager.addOne('student_info',req.body,(err,doc)=>{
          if (doc!=null) {
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
          }else{
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end("<script>alert('插入失败')</script>")
          }
    })
}
