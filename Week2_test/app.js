/*
Hello Javascript
*/
const express = require('express');
const app = express();
const fs = require('fs');

app.locals.pretty = true;               //줄 바꿈 처리

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname));

app.set('view engine', 'ejs');
app.set('views', './views');

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
    fs.readdir('data/', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        const id = req.params.id;
        if(id){
        // id 값이 있을 때
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            })
        } else {
            //id 값이 없을 때
            res.render('view', {topics:files, title:'Welocme', description:'Hello, JavaScript for server.'});
        }
    })
});

// app.get('/topic/:id', (req, res) => {
//     const id = req.params.id;
//     fs.readdir('data/', (err, files) => {
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/' + id, 'utf8', (err, data) => {
//             if(err){
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view', {topics:files, title:id, description:data});
//         })
//     })
// });

app.listen(3000, (req, res) =>{
    console.log('Connected 3000 port!');
});
