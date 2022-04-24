const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
var path = require('path');



exports.list = async (query,page) => {
   return await db().collection('products').find(query).skip((page.number - 1) * page.limit).limit(page.limit).toArray();
}

exports.productById = async (id) => {
   return await db().collection('products').findOne({ _id: ObjectId(id) });
}

exports.numOfProduct = async (query) => {
   return await db().collection('products').countDocuments(query);
}

exports.send = async (obj) => {
   await db().collection("products").insertOne(obj, function (err, res) {
      if (err) throw err;
      //neu khong co loi
      console.log('Inserted');
   });
   return;
}

exports.update = async (id, product) => {
   const myquery = { _id: ObjectId(id) };
   const old = await db().collection("products").findOne(myquery);

   const new_product = {
      name: product.fields.name,
      price: parseInt(product.fields.price),
      stock: parseInt(product.fields.stock),
      author: product.fields.author,
      year: parseInt(product.fields.year),
      genre: product.fields.genre,
      image1: old.image1,
      image2: old.image2,
      image3: old.image3
   };

   if(old.image1 && product.files.image1.size>0){
      await cloudinary.uploader.destroy(path.parse(old.image1).name);
      
   }
   if(old.image2 && product.files.image2.size>0){
      await cloudinary.uploader.destroy(path.parse(old.image2).name);
   }
   if(old.image3 && product.files.image3.size>0){
      await cloudinary.uploader.destroy(path.parse(old.image3).name);
   }
   


   if (product.files.image1.size > 0) {
      const filepath=product.files.image1.filepath;
      const result = await cloudinary.uploader.upload(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
      });
      fs.unlink(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
         console.log('File deleted!');
      });
      new_product.image1=result.url;
   }

   if (product.files.image2.size > 0) {
      const filepath=product.files.image2.filepath;
      const result = await cloudinary.uploader.upload(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
      });
      fs.unlink(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
         console.log('File deleted!');
      });
      new_product.image2=result.url;
   }   
   
   if (product.files.image3.size > 0) {
      const filepath=product.files.image3.filepath;
      const result = await cloudinary.uploader.upload(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
      });
      fs.unlink(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
         console.log('File deleted!');
      });
      new_product.image3=result.url;
   }

   
   await db().collection("products").updateOne(myquery, { $set: new_product }, function (err, res) {
      if (err) throw err;
      //neu khong co loi
      console.log('Updated');
   });
}

exports.delete = async (id) => {
   const myquery = { _id: ObjectId(id) };
   const product = await db().collection("products").findOne(myquery);
   // const img1 = path.parse(product.image1).base;
   // const img2 = path.parse(product.image2).base;
   // const img3 = path.parse(product.image3).name;

   if(product.image1){
      await cloudinary.uploader.destroy(path.parse(product.image1).name);
   }
   if(product.image2){
      await cloudinary.uploader.destroy(path.parse(product.image2).name);
   }
   if(product.image3){
      await cloudinary.uploader.destroy(path.parse(product.image3).name);
   }
   // await cloudinary.uploader.destroy(product.image1,function (err){
   //    if (err) {
   //       console.log('error:', err);
   //       throw (err);
   //    }
   // });
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
   // console.log(product.files.image.length);
   const new_product = {
      name: product.fields.name,
      price: parseInt(product.fields.price),
      stock: parseInt(product.fields.stock),
      author: product.fields.author,
      year: parseInt(product.fields.year),
      genre: product.fields.genre,
      image1: null,
      image2: null,
      image3: null

   };

   if (product.files.image1.size > 0) {
      const filepath=product.files.image1.filepath;
      const result = await cloudinary.uploader.upload(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
      });
      fs.unlink(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
         console.log('File deleted!');
      });
      new_product.image1=result.url;
   }

   if (product.files.image2.size > 0) {
      const filepath=product.files.image2.filepath;
      const result = await cloudinary.uploader.upload(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
      });
      fs.unlink(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
         console.log('File deleted!');
      });
      new_product.image2=result.url;
   }   
   
   if (product.files.image3.size > 0) {
      const filepath=product.files.image3.filepath;
      const result = await cloudinary.uploader.upload(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
      });
      fs.unlink(filepath, function (err) {
         if (err) {
            console.log('error:', err);
            throw (err);
         }
         console.log('File deleted!');
      });
      new_product.image3=result.url;
   }
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