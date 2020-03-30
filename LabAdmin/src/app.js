const { app,port } = require('./index');
const { db }  = require('../src/models/db_config');
const userModel = require('../src/controllers/users');
const log = require('debug')('app:run');

async function run(){
    await db.sync().then(()=>{
        console.log("Database ready");
    }).catch((err)=>{
        console.log(err.toString());        
    });
}

run()

userModel.createUser("admin","admin","Dr.Thilagamani","s","admin@yopmail.com",false);