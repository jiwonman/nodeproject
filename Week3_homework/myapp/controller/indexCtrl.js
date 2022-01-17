const indexDAO = require('../model/indexDAO');

const indexRoot = async (req, res) => {
    try{
        const result = await indexDAO.showdata();
        console.log(result);
        res.send(result);
    } catch (err) {
        throw err;
    }
}

const indexData = async (req, res) => {
    try {
        id = req.body.id;
        const result = await indexDAO.data(id);
        console.log(result);
        res.render('index', {result:result[0]});
    } catch (err) {
        throw err;
    }
}

module.exports = {
    indexRoot, indexData
}