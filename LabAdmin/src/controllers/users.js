const { db, User } = require('../models/db_config');

class userModel{

    constructor(){    }
    createUser = async (username,password,fname,lname,email,status)=>{
        
        await User.create({userName: username,userPassword: password,firstName: fname,lastName: lname,emailId: email,status: status},{fields:["userName","userPassword","firstName","lastName","emailId","status"]})
        .then(result => {
            console.log(result);     
        }).catch((err)=>{
            if(err.parent.code == "ER_DUP_ENTRY"){
                console.log("User Already in Use");
            }
        });
    }
    
    authenticateUser = async (username, password)=>{
        console.log(username,password);        
    }   
}

module.exports = new userModel();
