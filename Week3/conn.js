const mysql = require('mysql');
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'o2'
});

conn.connect();

let sql = 'SELECT * FROM TOPIC';

conn.query(sql, (err, rows, fields) => {
    if(err){
        console.log(err);
    } else {
        for(let i=0; i<rows.length; i++){
            // console.log('rows', rows);       //rows는 배열이고, 각각의 값들이 행 하나하나를 나타매
            // console.log('fields', fields);   //fields는 Column을 의미함. 실행 시킨 실행 결과의 어떤 컬럼이 존재하고, 상세한 정보들이 나와있음 (일반적으로 필요없음)
            console.log(rows[i].title);
            console.log(rows[i].description);
            console.log(rows[i].author);
        }
    }
})

// sql = 'INSERT INTO topic (title, description, author) VALUES ("NodeJS", "Node.js is Server Side JavaScript", "egoing")';

// conn.query(sql, (err, rows, fields) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(rows);
//     }
// })

// sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';

// const params = ['Supervisor', 'Watcher', 'graphittie'];

// conn.query(sql, params, (err, rows, fields) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(rows);
//     }
// })

// sql = 'update topic set title=?, author=? where id=?';
// const params = ['NPM', 'leezche', 1];

// conn.query(sql, params, (err, rows, fields) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(rows);
//     }
// })

// sql = 'delete from topic where id=?';

// const params = [1];

// conn.query(sql, params, (err, rows, fields) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(rows);
//     }
// });

conn.end();