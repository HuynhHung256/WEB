const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.list = async (page,limit) => {
   return await db().collection('products').find().skip((page-1)*limit).limit(limit).toArray();
}

exports.productById = async (id) => {
   return await db().collection('products').find({ _id: ObjectId(id)}).toArray();
}

exports.numOfPage = async (limit) => {
   const numProduct = await db().collection('products').countDocuments();
   return (Math.ceil(numProduct/limit));
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