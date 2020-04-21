const {db}  = require('../src/models/db_config');
const {app}  = require('../src/services/index');

async function run(){
    return await db.sync().then(()=>{
        app.listen(8000, () => console.log(`Server started  on ${8000}!`)); 
        console.log("Database ready");
    }).catch((err)=>{
        console.log(err.toString());        
    });
}

run()
