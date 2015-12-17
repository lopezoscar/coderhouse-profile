"use strict";

var express = require("express");
var exphbs = require("express-handlebars");


var app = express();

app.set('view engine','handlebars');
app.engine('hbs',exphbs());

var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost:27017/test",["users"]);

app.use(express.static('public'));

var UserLib = require("./lib/User");
var User = new UserLib(db);



app.get('/profile/:user_id',function(req,res){
    User.getUserById(req.params.user_id,function(err,user){
       if(err){
           console.log(err);
           res.json(err);
       }else{
           var options = {
               profile: user,
               user:{
                   displayName:"Tu papá" //Debería tomar el usuario logueado, utilizando una sesión.
               },
               layout:false
           };
           res.render('profile.hbs',options);
       }
    });
});
app.get('/profile/:username',function(req,res){
    User.getUserByUsername(req.params.user_id,function(err,user){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            var options = {
                profile: user,
                layout:false,
                user:{
                    displayName:"Tu papá" //Debería tomar el usuario logueado, utilizando una sesión.
                }
            };
            res.render('profile.hbs',options);
        }
    });
});

app.listen(process.argv[2] || 3000,function(){
    console.log("SERVER UP");
});


