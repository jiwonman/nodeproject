const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

app.use(express.static('public'));  //정적 파일 코드

app.get('/', (req, res) =>{         // '/'는 루트 
    res.send('Hello home page');                 //send : 응답을 해준다.

});

app.get('/dynamic', (req, res) => {
    let lis = '';
    for(let i =0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }
    let time = Date();
    const output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>index</title>
    </head>
    <body>
        Hi! Dynamic!
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    </html>`;
    res.send(output);           //동적으로 파일 처리.(코드를 다시 실행해야함.)
});

app.get('/route', (req, res) => {
    res.send('Hello Router, <img src="/route.png">')
});

app.get('/login', (req, res) => {       //'/login'은 localhost:3000/login을 명시
    res.send('<h1>Login please<h1>');
});

app.listen(3000, () =>{
    console.log('Connected 3000 port!');
});

