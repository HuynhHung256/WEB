const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.list = async () => {
   return await db().collection('carts').find().toArray();
}

exports.numOfProduct = async () => {
   return await db().collection('carts').countDocuments();
}

exports.add= async(userid, product_id, qty)=>{
   const addData = {
      user: ObjectId (userid),
      product: ObjectId (product_id),
      qty: qty, 
   }
   const myquery = {_id:ObjectId(product_id)}
   const product = await db().collection("products").findOne(myquery);
   
   await db().collection("carts").insertOne(addData,function (err,res){
      if (err) throw err;
   });
}
exports.checkinstock  = async (product_id, qty) => {
   const myquery = {_id:ObjectId(product_id)}
   const product = await db().collection("products").findOne(myquery);
   if (qty > product.stock)
      return false;
   return true;
}
exports.delete= async(id)=>{
   const myquery = { _id: ObjectId(id) };
   await db().collection("carts").delete(myquery,function (err,res){
      if (err) throw err;
        //neu khong co loi
      console.log('Deleted');
   });
}