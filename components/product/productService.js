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
   // console.log(product.files.image[0].filepath);
   const img = [];
   for(let i=0; i<product.files.image.length; i++) {
      const result = await cloudinary.uploader.upload(product.files.image[i].filepath, function (err, result) {
         if (err) {
            console.log('error:', err);
            next(err);
            return;
         }
      });
      img.push(result.url);
   }
   console.log(img);
   // const result = await cloudinary.uploader.upload(image.files.image.filepath, function (err, result) {
   //     if (err) {
   //         console.log('error:', err);
   //         next(err);
   //         return;
   //     }
   // });
   for(let i = 0; i <product.files.image.length; i++) {
      fs.unlink(product.files.image[i].filepath, function (err) {
         if (err) {
            console.log('error:', err);
            next(err);
            return;
         }
         console.log('File deleted!');
      });
   }

   const new_product={
      name: product.fields.name,
      
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
   // console.log(img);
   // await db().collection('images').insertOne(img, function (err) {
   //     if (err) {
   //         console.log('error:', err);
   //         next(err);
   //         return;
   //     }
   //     console.log('Inserted');
   // });
}