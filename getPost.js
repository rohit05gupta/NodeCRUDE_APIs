const express = require('express');
const Router1 = express.Router();

const db = require('./connection');

Router1.get('getPost/:id', (req, res)=>{
    let sql = `select * from posts where id = ${req.params.id}`;
    db.query(sql,(err,rows, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(rows);
    });
});

module.exports = Router1;