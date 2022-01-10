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

app.get(['/topic/:id/edit'], (req, res) => {
    let sql = 'select id, title from topic';            //글 본문을 출력하기 위함.
    conn.query(sql, (err, topics, fields) => {
        if(err){
            console.log(err);
        } else {
            const id = req.params.id;
            if(id){
                sql = 'select * from topic where id=?';
                conn.query(sql, [id], (err, topic, fields) => {
                    if(err){
                        console.log(err);
                        res.status(500).send('Internal Sever Error');
                    } else{
                        res.render('edit', {topics:topics, topic:topic[0], id:id});
                    }
                })
            }
            else{
                console.log('There is no id');
                res.status(500).send('Internal Sever Error');
            }
        }
    })
});

app.post(['/topic/:id/edit'], (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const id = req.params.id;
    let sql = 'update topic set title=?, description=?, author=? where id=?';           
    conn.query(sql, [title, description, author, id], (err, result, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Sever Error');
        } else {
            res.redirect('/topic/' + id);
        }
    })
});

app.get(['/topic/:id/delete'], (req, res) => {
    let sql = 'select id, title from topic';
    const id = req.params.id;
    conn.query(sql, (err, topics, fields) => {
        if(err){
            console.log(err);
        }
        else {
            sql = 'select * from topic where id=?';
            conn.query(sql, [id], (err, topic, fields) => {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }   else {
                    if(topic.length === 0){
                        console.log('There is no id');
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.render('delete', {topics:topics, topic:topic[0]});
                    }
                }
            })
        }
    })
});

app.post('/topic/:id/delete', (req, res) => {
    const id = req.params.id;
    let sql = 'delete from topic where id=?';
    conn.query(sql, [id], (err, result, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }   else {
            res.redirect('/topic/');
            // res.redirect('/topic/' + result.insertId);
        }
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
