const db = require('../config/dbConn');

const showdata = () => {
  return new Promise((resolve, reject) => {
    db.query('select * from test', (err, data) => {
      if (err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

const data = (id) => {
  return new Promise((resolve, reject) => {
    db.query('select * from test where id=?', [id], (err, data) => {
      if(err) reject(err);
      else {
        resolve(data);
      }
    }) 
  })
}

module.exports = {
    data, showdata
}