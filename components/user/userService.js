const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.profile = async (id) => {
    const myquery = {user:ObjectId(id)}
    return await db().collection('customers').findOne(myquery);
 }

exports.updateProfile = async (id, profile) => {
    const myquery = {user:ObjectId(id)}
    profile.user = myquery.user;
    const user = await db().collection('customers').findOne(myquery);
    if(user)
        await db().collection('customers').updateOne(myquery, profile);
    else
        await db().collection('customers').insertOne(profile);
}
