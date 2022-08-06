const express = require('express');
const Router = express.Router();

const db = require('./connection');

Router.get('/', (req, res)=>{
    let sql = 'select * from posts';
    db.query(sql,(err, rows, results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        res.send(rows);
    });
});

module.exports = Router;