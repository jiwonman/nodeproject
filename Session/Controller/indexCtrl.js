const indexRoot = (req, res) => {
        res.render('index', { title: 'Session Example' });
}

module.exports = {
    indexRoot,
}