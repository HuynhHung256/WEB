const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { db } = require('../../models/db');
const bcrypt = require('bcryptjs');

exports.createAccount = async (email, pass, role) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    const account = {
        email: email,
        pass: hash,
        role:role
    };
    console.log(role);

    await db().collection("accounts").insertOne(account, async function (err, res) {
        if (err) throw err;
        //neu khong co loi    
        console.log('Sign in');
    });
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

exports.isUserExist=async(email)=>{
    const user=await db().collection("accounts").findOne({email:email});
    if(!user) return false;
    return true;
}