"use strict";

function User(db){

    return {
        getUserById:function(id,callback){
            db.users.findOne({_id:require("mongojs").ObjectId(id)},callback);
        },
        getUserByUsername:function(username,callback){
            db.users.findOne({username:username},callback);
        }
    }
}

module.exports = User;