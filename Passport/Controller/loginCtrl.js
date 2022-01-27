const authDAO = require('../model/authDAO');
const bkfd = require('../middlewares/bkfd2');

const loginRoot = async (req, res) => {
    res.render('login');
}

const logout = async (req, res) => {
    req.logout();
    delete req.session.flash;
    delete req.session.passport;
    res.redirect('/auth/welcome');
}

const Welcome = (req, res) => {
    console.log('welcome', req.session.passport);
    if(req.session.passport){
        res.send(`
        <h1>Hello, ${req.session.passport.user.name}</h1>
        <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <a href="/auth/login">Login</a><br>
        <a href="/auth/register">Register</a>`);
    }
}

const Register = (req, res) => {
    res.render('register');
}

module.exports = {
    loginRoot,
    logout,
    Welcome,
    Register, 
}