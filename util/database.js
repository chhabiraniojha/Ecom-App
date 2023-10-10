const mysql2=require("mysql2");


const pool=mysql2.createPool({
    host:"localhost",
    user:"root",
    database:"nodeProject",
    password:"rinku9938300585@"
})
module.exports=pool.promise();