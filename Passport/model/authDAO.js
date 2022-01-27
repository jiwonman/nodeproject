const db = require('../Config/dbConn');

function checkUserID(parameters) {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM User WHERE user_id =?`;
        db.query(queryData, [parameters.user_id], (error, db_data) => {
            if(error){
                reject(error);
            }
            if(db_data[0] == undefined) resolve('유저정보 없음'); 
            else reject('이미 유저정보가 있음');
        }) 
    })
}

function insertUser(parameters) {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO User (user_id, user_pw, salt, name) VALUES (?, ?, ?, ?)`;
        db.query(queryData, [parameters.user_id, parameters.user_pw, parameters.salt, parameters.name], (error, db_data) => {
            console.log(db_data);
            if(error) { reject(error) };
            if(db_data.affectedRows != 0) resolve('유저정보 입력완료')
            else reject('실패')
        })
    })
}

function passportCheckUser(parameters) {
    console.log(parameters)
    return new Promise((resolve, reject) => {
        let queryData = `SELECT user_id, name FROM User Where user_id =?`;
        db.query(queryData, [parameters], (error, db_data) => {
            console.log(db_data[0]);
            if(error) reject('등록되지 않은 사용자');
            else resolve(db_data[0])
        })
    })
}

function passportCheckGoogle(parameter) {
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT user_id, name, provider FROM Google WHERE user_id = ?`;
        db.query(queryData, [parameter.id], function (error, db_data){
            if(error) resolve(error)
            if(db_data[0] != undefined) resolve(db_data[0])
            else resolve(0)
        })
    })
}

function insertGoogleUser(parameter){
    return new Promise(function (resolve, reject) {
        let queryData = `INSERT INTO Google (user_id, name, email, verified, email_verified, provider) VALUES (?,?,?,?,?,?)`;
        db.query(queryData, [parameter.id, parameter.name, parameter.email, parameter.verified, parameter.email_verified, parameter.provider], function (error, db_data){
            if (error) { reject(error) }
            if (db_data.affectedRows != 0) resolve('유저정보 입력완료')
            else reject('실패')
        })
    })
}

function passportCheckUserLogin(parameter){
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT salt, user_pw FROM User WHERE user_id = ?`;
        db.query(queryData, [parameter], function (error, db_data) {
            console.log(db_data[0])
            if (error) { reject(error) }
            if(db_data[0] == undefined) reject('등록되지 않은 사용자')
            else resolve(db_data[0])
        })
    })
}
module.exports = {
    passportCheckUser,
    insertUser,
    checkUserID,
    passportCheckGoogle,
    passportCheckUserLogin,
    insertGoogleUser
}