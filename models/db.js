const { MongoClient } = require("mongodb");
require ('dotenv').config(); 
const uri = process.env.DATABASE_URI;
// const uri="mongodb+srv://khang:giakhang21090503@cluster0.jpfv6.mongodb.net/test?authSource=admin&replicaSet=atlas-jr2hvz-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

const client = new MongoClient(uri);

exports.connect = () => {
  return client.connect();
}

exports.db = () =>{
  return client.db('bookstore');
}


// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('bookstore');
//     const products = await database.collection('products').find().toArray();
//     console.log(products);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run();