const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.list = async () => {
   return await db().collection('carts').find().toArray();
}

exports.getCart = async (id) => {
   // console.log(id);
   return await db().collection('products').aggregate([
       // {$match: {user: ObjectId(id)}},
       {
           $lookup: {
               from: 'carts',
               localField: '_id',
               foreignField: 'product',
               pipeline: [
                   { $match: { $expr: { $eq: ['$user', ObjectId(id)] } } }
               ],
               as: 'cart'
           }
       },{ $unwind: "$cart" }
   ]).toArray();
}


exports.numOfProduct = async () => {
   return await db().collection('carts').countDocuments();
}

exports.add= async(userid, product_id, qty)=>{
   const myquery = {user:ObjectId(userid), product:ObjectId(product_id)}
   const cart = await db().collection("carts").findOne(myquery);
   if (cart == null){
      const addData  = {
         user: ObjectId (userid),
         product: ObjectId (product_id),
         qty: parseInt(qty), 
      }
      await db().collection("carts").insertOne(addData,function (err,res){
         if (err) throw err;
      });
   }
   else {
      const addData  = {
         user: ObjectId (userid),
         product: ObjectId (product_id),
         qty: parseInt(qty) + cart.qty, 
      }
      await db().collection("carts").updateOne(myquery,{ $set: addData }, function (err,res){
         if (err) throw err;
      });
   }
}

exports.checkinstock  = async (userid, product_id, qty) => {
   const myqueryprod = {_id:ObjectId(product_id)}
   const product = await db().collection("products").findOne(myqueryprod);
   const myquerycart = {user:ObjectId(userid), product:ObjectId(product_id)}
   const cart = await db().collection("carts").findOne(myquerycart);
   if (qty > product.stock || (cart != null && cart.qty + parseInt(qty) > product.stock))
      return false;
   return true;
}
// exports.checkcartinstock = async (product_id,qty) => {
//    const myqueryprod = {_id:ObjectId(product_id)}
//    const product = await db().collection("products").findOne(myqueryprod);
//    if(product.stock < qty){
//       return false;
//    }
//    return true;
// }
// exports.addincart = async (userid, product_id, qty)=>{
//    const myquery = {user:ObjectId(userid), product:ObjectId(product_id)}
//    const addData  = {
//       user: ObjectId (userid),
//       product: ObjectId (product_id),
//       qty: parseInt(qty), 
//    }
//    await db().collection("carts").updateOne(myquery,{ $set: addData }, function (err,res){
//          if (err) throw err;
//       });
// }

exports.delete= async(userid, product_id, qty)=>{
   const myquery = { user: ObjectId(userid), product:ObjectId(product_id) };
   const cart = await db().collection("carts").findOne(myquery);
   if(cart.qty == 0){
      return false;
   }
   const addData  = {
      user: ObjectId (userid),
      product: ObjectId (product_id),
      qty:  cart.qty-parseInt(qty), 
   }
   await db().collection("carts").updateOne(myquery,{ $set: addData }, function (err,res){
      if (err) throw err;
   });
}
exports.takeprice= async(prod_id)=>{
   const myqueryprod = {_id:ObjectId(prod_id)}
   const product = await db().collection("products").findOne(myqueryprod);
   return product.price;
}