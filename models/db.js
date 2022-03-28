const { MongoClient } = require("mongodb");
require ('dotenv').config(); 
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

exports.connect = () => {
  return client.connect();
}

exports.db = () =>{
  return client.db();
}
async function run() {
  try {
    await client.connect();
    const database = client.db('bookstore');
    const movies = database.collection('products');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}