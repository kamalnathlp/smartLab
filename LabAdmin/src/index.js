const express = require('express');
const path = require('path');
const fs = require('fs');
const fastcsv = require('fast-csv');
const compression = require('compression');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');


const app = express();
const jsonparser = bodyParser.json();
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//add other middleware
app.use(cors());
app.use(morgan('dev'));


var classParent;
var className;

var storage = multer.diskStorage({
    destination: (req,file,cb) =>{
      cb(null,__dirname + '/adminPage/uploads/');
    },
    filename: (req,file,cb) =>{
      console.log(req.body.stuClass);
      cb(null,req.body.stuClass+'_'+req.body.stuSection+path.extname(file.originalname));
    }
});

var upload = multer({storage: storage});

const port = process.env.PORT || 8000;
app.use("/", express.static(path.join(__dirname,"../static/loginAuth/")));
app.use("/admin", express.static(path.join(__dirname, "../static/adminPage/")));
app.use("/login", express.static(path.join(__dirname, "../static/adminPage/")));
app.use("/typography", express.static(path.join(__dirname, "../static/adminPage/")));

app.get('/', (req, res) => {
  res.render('Index.ejs', { root: __dirname });
});

app.get('/admin', (req, res) => {
  res.render('index.ejs', { root: __dirname });
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { root: __dirname });
});

app.get('/dash',(req, res) => {
  res.render('dashboard.ejs',{root: __dirname});
});

app.get('/studentDetails', (req, res) => {
  res.render('studentDetails.ejs',{root: __dirname})
});

// app.get('/fetchStudent',jsonparser,(req,res) =>{

//   classParent = req.query.currentClass;
//   className = req.query.currentSection.toUpperCase();

//   let sql = "SELECT studentRegId,studentName,studentSection,studentMail,studentDOB FROM " + classParent + " WHERE studentSection LIKE " + '\'' + className +'\' ORDER BY studentRegId;';

//   db.query(sql,(err,rows)=>{
//     if(err) throw err;
//     else{
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.end(JSON.stringify(rows));
//     }
//   });
// });

// app.post('/fileUpload',upload.single('studentdata'),(req,res) =>{
//   try{
//     if(!req.file){
//       res.send({
//           status: false,
//           message: 'No file uploaded or Upload proper file'
//       });
//     }
//     else{
      
//       let stream = fs.createReadStream(req.file.path);
//       console.log(req.file.path);
//       let csvdata = [];
//       classParent = req.body.stuClass;
//       if(!classParent){
//         classParent = req.body.classParent;
//       }
//       console.log(req);

//       let csvStream = fastcsv
//       .parse()
//       .on("data",function(data){
//         csvdata.push(data);
//       })
//       .on("end",()=>{
//         csvdata.shift();
//         let trunc_sql = "TRUNCATE TABLE "+classParent;
//         db.query(trunc_sql,(err,rows)=>{
//           console.log(err);
//         });
//         let sql = "INSERT INTO "+classParent+" (studentRegId,studentName,studentSection,studentMail,studentDOB) VALUES ?;";
//         db.query(sql,[csvdata],(err)=>{
//           if(err) throw err;
//           else{
//             res.send({
//               status: true,
//               message: 'File Uploaded Successfully',
//               data: {
//                 name: req.file.filename,
//                 mimetype: req.file.mimetype,
//                 size: req.file.size
//               }
//             });
//           }
//         });
//       });

//       stream.pipe(csvStream);
//     }
//   }
//   catch(err){
//    // console.log(err);
//     res.status(500).send(err);
//   }
// });

// app.post('/addStudent',(req,res)=>{

//     // console.log(JSON.parse(req));
//     console.log(req);
//     if(!req.body){
//         res.status(400).send({
//           status: false,
//           message: 'Proper Input'
//       });
//     }
//     else{

//       let registerId = req.body.stuRegId + req.body.stuRegNum;
//       let studentName = req.body.stuName;
//       let studentEmail = req.body.stuEmail;
//       let studentSection = req.body.stuSection;
//       let StudentDate = req.body.stuDate;
//       let stuYear = req.body.stuYear;
//       let records = [[registerId,studentName,studentSection,studentEmail,StudentDate]];
//       var checkStudent = false;

//       let checkSql = "SELECT 1 FROM "+ stuYear+" WHERE studentRegId=? ORDER BY studentRegId LIMIT 1;";

//       db.query(checkSql,[registerId],(err,result,fields)=>{

//         if(err) throw err;
//         console.log(result);
//         if(!result.length > 0){
//           let sql = "INSERT INTO "+stuYear+" (studentRegId,studentName,studentSection,studentMail,studentDOB) VALUES (?);";

//           db.query(sql,records,(err, result, fields)=>{
  
//             if(err) throw err;
//             console.log(result);
  
//             console.log("Number of rows affected : " + result.affectedRows);
//             console.log("Number of records affected with warning : " + result.warningCount);
//             console.log("Message from MySQL Server : " + result.message);
//               res.status(200).send({
//                 status: true,
//                 message: '2'
//               });
//           });
//         }
//         else{
//           res.send({
//             status: false,
//             message: '1'
//           });
//         }
//       });
//     }
    
// });

// app.post('/deleteStudent',(req,res)=>{

//   if(!req.body.register){
//     res.send({
//       status: false,
//       message: '2'
//     });
//   }
// else{
//   let sql = "DELETE FROM "+req.body.year+" WHERE studentRegId=?;";
//   db.query(sql,req.body.register,(err,result,fields)=>{

//     if(err){
//       res.status(400).send({
//         message: err.toString()
//       });
//     }
//     else{
//       res.status(200).send({
//         message: JSON.stringify(result)
//       });
//     }

//   });
// }
// });

// app.put('/alterStudent',(req,res)=>{
//   console.log(req);
//   if(!req.body){
//       res.send({
//         status: false,
//         message: 'Proper Input'
//     });
//   }
//   else{

//     let registerId = req.body.altstuRegId;
//     let studentName = req.body.altstuName;
//     let studentEmail = req.body.altstuEmail;
//     let studentSection = req.body.altstuSection;
//     let StudentDate = req.body.altstuDate;
//     let stuYear = req.body.altstuYear;
//     let records = [studentName,studentSection,studentEmail,StudentDate,registerId];
//     var checkStudent = false;

//     let checkSql = "SELECT 1 FROM "+ stuYear+" WHERE studentRegId=? ORDER BY studentRegId LIMIT 1;";

//     db.query(checkSql,[registerId],(err,result,fields)=>{

//       if(err) throw err;
//       console.log("Processes "+result.length);
//       if(result.length > 0){
//         let sql = "UPDATE "+stuYear+" SET studentName=?, studentSection=?, studentMail=?, studentDOB=? WHERE studentRegId=?;";

//         db.query(sql,records,(err, result, fields)=>{

//           console.log(sql);

//           if(err) throw err;
//           console.log(result);

//           console.log("Number of rows affected : " + result.affectedRows);
//           console.log("Number of records affected with warning : " + result.warningCount);
//           console.log("Message from MySQL Server : " + result.message);
//             res.send({
//               status: true,
//               message: '2'
//             });
//         });
//       }
//       else{
//         res.send({
//           status: false,
//           message: '1'
//         });
//       }
//     });
//   }

// });

app.listen(port, () => console.log(`Server started  on ${port}!`)); 