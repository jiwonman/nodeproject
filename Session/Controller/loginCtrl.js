const loginRoot = (req, res) => {
    res.render('login');
}

const user = {
    username : 'jiwon',
    password : '111',
    displayName : 'JiwonMan'
}

const loginAction = (req, res) => {
    const uname = req.body.username;
    const pwd = req.body.password;
    if(uname === user.username && pwd === user.password){
        req.session.displayName = user.displayName;
        res.redirect('/auth/welcome');
    } else {
        res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
    }
}

const logout = (req, res) => {
    delete req.session.displayName;
    res.redirect('/auth/welcome');
}

const Welcome = (req, res) => {
    if(req.session.displayName){
        res.send(`<h1>Hello, ${req.session.displayName}<h1><a href="/auth/logout">logout</a>`);
    } else {
        res.send(`<h1>Welcome</h1><a href="/auth/login">Login</a>`);
    }
}

module.exports = {
    loginRoot,
    loginAction,
    logout,
    Welcome,
}