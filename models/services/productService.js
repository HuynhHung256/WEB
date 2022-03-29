const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../db');

exports.list = async (page) => {
   const productInPage=4;
   return await (await db().collection('products').find().toArray()).slice(productInPage*(page-1),productInPage*page);
}

exports.productById = async (id) => {
   return await db().collection('products').find({ _id: ObjectId(id)}).toArray();
}

exports.numOfPage = async () => {
   const numProductOfPage = 4;
   const numProduct = await db().collection('products').countDocuments();
   return (Math.ceil(numProduct/numProductOfPage));
}

exports.send= async(obj)=>{
   await db().collection("products").insertOne(obj,function (err,res){
      if (err) throw err;
        //neu khong co loi
      console.log('Inserted');
   });
   return;
}

exports.update= async(id,new_obj)=>{
   const myquery = { _id: ObjectId(id) };
   await db().collection("products").updateOne(myquery,{$set:new_obj},function (err,res){
      if (err) throw err;
        //neu khong co loi
      console.log('Updated');
   });
   return;
}

exports.delete= async(id)=>{
   const myquery = { _id: ObjectId(id) };
   await db().collection("products").deleteOne(myquery,function (err,res){
      if (err) throw err;
        //neu khong co loi
      console.log('Deleted');
   });
   return;
}