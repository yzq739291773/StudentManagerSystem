'use strict'

//引包
const mongodb = require('mongodb')
const mongodbClient = mongodb.MongoClient

const url = "mongodb://localhost:27017/playerInfo"

//专门获取db对象
function getDB(callback){
    //1.连接到数据库
    mongodbClient.connect(url,(err,db)=>{
        callback(err,db)
    })
}

//查找唯一的一条数据
/**
exports.findOne = (collectionName,condition,callback) =>{
    //根据条件去数据库中查找到这个数据，
    //然后返回给我们的控制器去做事就行了
    //
    //1.连接到数据库
    mongodbClient.connect(url,(err,db)=>{

    //2.获取数据库中的集合
    var collection = db.collection(collectionName);

    //3.使用mongodb去操作数据库，获取到结果
    collection.findOne(condition,(err,doc)=>{
          //通过回调函数，将mongodb获取到的结果返回给控制器去处理
          callback(err,doc)
    })

    db.close()
  })
}

//获取列表
exports.findList = (collectionName,condition,callback)=>{
    mongodbClient.connect(url,(err,db)=>{

      var collection = db.collection(collectionName);

      collection.find(condition).toArray((err,docs)=>{
        //将结果返回给控制器去做事
        callback(err,docs)

        db.close()
      })
  })
}
**/
exports.findOne = (collectionName,condition,callback) =>{
    //根据条件去数据库中查找到这个数据，
    //然后返回给我们的控制器去做事就行了
    //1.获取到db对象
    getDB((err,db)=>{
          //2.获取数据库中的集合
          var collection = db.collection(collectionName);

          //3.使用mongodb去操作数据库，获取到结果
          collection.findOne(condition,(err,doc)=>{
                //通过回调函数，将mongodb获取到的结果返回给控制器去处理
                callback(err,doc)

                db.close()
          })
        })
}

//获取列表
exports.findList = (collectionName,condition,skipCount,limitCount,callback)=>{
    getDB((err,db)=>{
        var collection = db.collection(collectionName);

        collection.find(condition).skip(skipCount).limit(limitCount).toArray((err,docs)=>{
          //将结果返回给控制器去做事
          callback(err,docs)

          db.close()
        })
    })
}

//获取我们满足条件的个数
exports.getCount = (collectionName,condition,callback)=>{
    //1.获取db对象
    getDB((err,db)=>{
        //2.获取到数据库中的集合
        var collection = db.collection(collectionName)

        //3.查询个数
        collection.find(condition).count((err,count)=>{
            callback(err,count)
        })
    })
}

//新增的方法
exports.addOne = (collectionName,condition,callback)=>{
   //1.拿到db对象
   getDB((err,db)=>{
        //2.获取到要操作的集合
       var collection = db.collection(collectionName)

       //3.新增数据
       collection.insertOne(condition,(err,doc)=>{
          callback(err,doc)
       })
   })
}
