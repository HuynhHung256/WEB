const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

exports.list = async (page, limit) => {
   return await db().collection('products').find().skip((page - 1) * limit).limit(limit).toArray();
}

exports.productById = async (id) => {
   return await db().collection('products').findOne({ _id: ObjectId(id) });
}

exports.numOfProduct = async () => {
   return await db().collection('products').countDocuments();
}

exports.send = async (obj) => {
   await db().collection("products").insertOne(obj, function (err, res) {
      if (err) throw err;
      //neu khong co loi
      console.log('Inserted');
   });
   return;
}

exports.update = async (id, new_obj) => {
   const myquery = { _id: ObjectId(id) };
   await db().collection("products").updateOne(myquery, { $set: new_obj }, function (err, res) {
      if (err) throw err;
      //neu khong co loi
      console.log('Updated');
   });
   return;
}

exports.delete = async (id) => {
   const myquery = { _id: ObjectId(id) };
   const product = await db().collection("products").findOne(myquery);
   await cloudinary.uploader.destroy(product.image1,function (err){
      if (err) {
         console.log('error:', err);
         throw (err);
      }
   });
   await db().collection("products").deleteOne(myquery, function (err, res) {
      if (err) throw err;
      //neu khong co loi
      console.log('Deleted');
   });
   return;
}


exports.parse = async (req) => {
   const form = formidable({
      multiples: true,
      uploadDir: 'public/images',
      keepExtensions: true,
      // filename: 
   });
   // var img;
   const img = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
         if (err) {
            reject(err);
            return;
         }
         resolve({ fields, files });
      });
   });
   return img;
   // });
}

exports.insert = async (product) => {
   console.log(product.files.image.length);
   const img = [];
   for (let i = 0; i < product.files.image.length; i++) {
      if (product.files.image[i].size > 0) {
         const result = await cloudinary.uploader.upload(product.files.image[i].filepath, function (err) {
            if (err) {
               console.log('error:', err);
               throw (err);
            }
         });
         img.push(result.url);
      }
   }
   console.log(img);
   for (let i = 0; i < product.files.image.length; i++) {
      if (product.files.image[i].size > 0) {

         fs.unlink(product.files.image[i].filepath, function (err) {
            if (err) {
               console.log('error:', err);
               throw (err);
            }
            console.log('File deleted!');
         });
      }
   }

   const new_product = {
      name: product.fields.name,
      price: parseInt(product.fields.price),
      stock: parseInt(product.fields.stock),
      author: product.fields.author,
      year: parseInt(product.fields.year),
      genre: product.fields.genre,
      image1: img[0],
      image2: img[1],
      image3: img[2]
   };

   // const img = {
   //     name: image.fields.name,
   //     src: result.url,
   //     height: result.height,
   //     width: result.width,
   //     owner: user.id,
   //     private: image.fields.mode == 'private' ? true : false,
   //     tags: []
   // };
   // console.log(new_product);
   db().collection('products').insertOne(new_product, function (err) {
      if (err) {
         console.log('error:', err);
         throw (err);
      }
      console.log('Inserted');
   });
}