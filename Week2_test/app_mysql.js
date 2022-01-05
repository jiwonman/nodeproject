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

app.get('/topic/new', (req, res) => {
    fs.readdir('data/', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files, title:0});
    })
});

app.post('/topic', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    fs.writeFile('data/' + title, description, (err) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    } );
})

app.get(['/topic', '/topic/:id'], (req, res) => {
    let sql = 'select id, title from topic';
    conn.query(sql, (err, topics, fields) => {
        if(err){
            console.log(err);
        } else {
            let id = req.params.id;
            if(id){
                sql = 'select * from topic where id=?';
                conn.query(sql, [id], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    } else{
                        res.render('view', {topics:rows, topic:topics[0], title:1});
                    }
                })
            }
            else{
                res.render('view', {topics:rows, title:0});
            }
        }
    })
});


app.listen(3000, (req, res) =>{
    console.log('Connected 3000 port!');
});
