const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.list = async (userid) => {
    const myquery = {user:ObjectId(userid)}
    return await db().collection('accounts').find(myquery);
 }


