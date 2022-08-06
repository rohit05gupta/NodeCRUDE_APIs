const msql = require('mysql');

const db = msql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodemysql'
});

//connect to mysql db
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql database connected....');
});

module.exports = db;