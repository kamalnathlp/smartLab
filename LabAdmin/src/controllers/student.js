const {secondYear, thirdYear, fourthYear} = require('../models/db_config');

class studentModel{

    constructor() { }

    createStudent = async (id, name, section, mail, dob,year) => {

        let yearMdl = (year == 'secondyear') ? secondYear : (year == 'thirdyear') ? thirdYear : fourthYear;  

        await yearMdl.create({studentRegId: id,studentName: name,studentSection: section,studentMail: mail,studentDOB: dob},{fields:["studentRegId","studentName","studentSection","studentMail","studentDOB"]})
        .then(result => {
            console.log(result);     
        }).catch((err)=>{
            if(err.parent.code == "ER_DUP_ENTRY"){
                console.log("User Already in Use");
            }
        });

    }

    updateStudent = async (id, name, section, mail, dob,year) => {

        let yearMdl = (year == 'secondyear') ? secondYear : (year == 'thirdyear') ? thirdYear : fourthYear;  

       return await yearMdl.update({studentName: name,studentSection: section,studentMail: mail,studentDOB: dob},
            { where : {studentRegId: id},
               plain: true
               })
        .then(result => {            
            if(result[0]) return true;
            return false;    
        }).catch((err)=>{
            if(err.parent.code == "ER_DUP_ENTRY"){
                console.log("User Already in Use");
            }
        });

    }

    deleteStudent = async (id,year) => {

        let yearMdl = (year == 'secondyear') ? secondYear : (year == 'thirdyear') ? thirdYear : fourthYear;  

        return await yearMdl.destroy({ where : {studentRegId: id}})
        .then(result => {   
            console.log(result);
                    
            if(result) return true;
            return false;    
        }).catch((err)=>{
            if(err.parent.code == "ER_DUP_ENTRY"){
                console.log("User Already in Use");
            }
        });

    }

    readStudent = async (year,section) => {

        let yearMdl = (year == 'secondyear') ? secondYear : (year == 'thirdyear') ? thirdYear : fourthYear;  
       
            return await yearMdl.findAll({
                where : {
                    studentSection : section
                }
            })
            .then((value)=>{              
                return value;})
            .catch((err)=>console.log(err));  
    }
}

module.exports = new studentModel();