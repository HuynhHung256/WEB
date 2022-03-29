const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../db');

exports.list = async () => {
   return await db().collection('products').find().toArray();
}

exports.productById = async (id) => {
   return await db().collection('products').find({ _id: ObjectId(id)}).toArray();
}

exports.numOfPage = async () => {
   const numProductOfPage = 4;
   const numProduct = await db().collection('products').countDocuments();
   



   return (Math.ceil(numProduct/numProductOfPage));
}