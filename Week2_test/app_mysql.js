const mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'o2'
});

const express = require('express');
const app = express();
const fs = require('fs');

app.locals.pretty = true;               //줄 바꿈 처리

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname));

app.set('view engine', 'ejs');
app.set('views', './views_mysql');

app.get('/topic/add', (req, res) => {
    let sql = "select id, title from topic";
    conn.query(sql, (err, topics, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics:topics, id:'hell'});
    })
});

app.post('/topic/add', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;

    let sql = 'insert into topic (title, description, author) values (?, ?, ?)';
    conn.query(sql, [title, description, author], (err, result, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }   else {
            res.redirect('/topic/' + result.insertId);
        }
    })
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    let sql = 'select id, title from topic';
    conn.query(sql, (err, topics, fields) => {
        if(err){
            console.log(err);
        } else {
            let id = req.params.id;
            if(id){
                sql = 'select * from topic where id=?';
                conn.query(sql, [id], (err, topic, fields) => {
                    if(err){
                        console.log(err);
                        res.status(500).send('Internal Sever Error');
                    } else{
                        res.render('view', {topics:topics, topic:topic[0], id:id});
                    }
                })
            }
            else{
                res.render('view', {topics:topics, id:id});
            }
        }
    })
});


app.listen(3000, (req, res) =>{
    console.log('Connected 3000 port!');
});
