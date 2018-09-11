const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
let ObjectID = MongoDB.ObjectID
const Config = require('./config')


class Db {
    static getInstance() {
        if(!Db.instance) {
            Db.instance = new Db()
        }
        return  Db.instance 
    }
    
    constructor() {
        this.dbClient = ''
        this.connect()
    }
    connect(){  /*连接数据库*/
        return new Promise((resolve,reject)=>{
            if(!this.dbClient){         /*1、解决数据库多次连接的问题*/
                MongoClient.connect(Config.dbUrl,{ useNewUrlParser: true },(err,client)=>{
                    if(err){
                        reject(err)
                    }else{
  
                        this.dbClient=client.db(Config.dbName);
                        resolve(this.dbClient)
                    }
                })
            }else{
                resolve(this.dbClient);
            }
        })
      }
    find(collectionName, doc) {//查找
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(doc)
                result.toArray((err, docs) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    resolve(docs)
                })
            })
        })
    }
    update(collectionName, doc1, doc2){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).updateOne(doc1,{$set:doc2}, (err, result) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    resolve(result)
                })
            })
        })
    }
    insert(collectionName, doc){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).insertOne(doc, (err, result) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    resolve(result)
                })
            })
        })
    }
    remove(collectionName, doc){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).removeOne(doc, (err, result) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    resolve(result)
                })
            })
        })
    }
    getObjectId(id) {
        return new ObjectID(id)
    }
}

module.exports = Db.getInstance()