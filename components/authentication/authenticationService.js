const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { db } = require('../../models/db');
const bcrypt = require('bcryptjs');

exports.createAccount = async (email, pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    const account = {
        email: email,
        pass: hash,
        role:'customer'
    }
    await db().collection("accounts").insertOne(account, function (err, res) {
        if (err) throw err;
        //neu khong co loi
        console.log('Sign in');
    })
    return;
}

exports.verifyUser=async(email,pass)=>{
    const user=await db().collection("accounts").findOne({email:email});
    if(!user)
        return false;
    if(bcrypt.compareSync(pass,user.pass))
        return user;
    return false;
}