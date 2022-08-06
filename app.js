const express = require('express');

const allposts = require('./getPosts');
const singlePost = require('./getPost');

const bodyParser = require("body-parser");

const db = require('./connection');

const app = express();

app.use(bodyParser.json());

app.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Database created ....');
    });
});

app.get('/createposts', (req, res)=>{
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Posts table created ....');
    });
});

app.get('/addpost1', (req, res)=>{
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'insert into posts set ?';
    db.query(sql,post,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Record created ....');
    });
});

app.get('/addpost2', (req, res)=>{
    let post = {title: 'Post Two', body: 'This is post number two'};
    let sql = 'insert into posts set ?';
    db.query(sql,post,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Post 2 added ....');
    });
});

app.use('/getPosts',allposts);

//app.use('/getPost/:id',singlePost);

app.get('/getpost/:id', (req, res)=>{
    let sql = `select * from posts where id = ${req.params.id}`;
    db.query(sql,(err, row, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(row);
    });
});

app.post('/addpost',(req,res)=>{
    let sql = `insert into posts (title,body) values ('${req.body.title}','${req.body.body}')`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(req.body.title+' added....');
    });
});

//Update post
app.get('/updatePost/:id', (req, res)=>{
    let newTitle = 'Updated title'
    let sql = `Update posts set title = '${newTitle}' where id = ${req.params.id}`;
    db.query(sql,(err, results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        res.send(`Post with id ${req.params.id} got updated successfully....`);
    });
});

app.get('/deletePost/:id', (req, res)=>{
    let sql = `Delete from posts where id = ${req.params.id}`;
    db.query(sql,(err, results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        res.send(`Post with id ${req.params.id} got deleted successfully....`);
    });
});

app.listen('3000',()=>{
    console.log('server started on port 3000');
});