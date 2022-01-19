const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

const loginRoot = (req, res) => {
    res.render('login');
}

let users = [{
    username : 'jiwon',
    password : 'fzblKcd9B0z6rhrsUNcIQz7dpJ8YLINrntkbYtIE+Oj6pI9vsO+S5+fQ5HM9pruj4jnL3WENcd0mxHugK8SHC1vbKrl5zbg0j0QuGG1ouSE7Y7YdF+CoyX1t5eNNiM0vqOU6Qa+BlgTnJfO3wNlcTuJDYUSc54yzXqpa3md4JsE=',
    displayName : 'JiwonMan',
    salt : 'BjtssC1fP2cn7SReanndz5bbcCh0XbqzAO1H4qk0Ibv8VaRtEXnCH/goQn2OihM3y9DWtsMMU1f4uPT9XPI1CQ=='
}];

const loginAction = (req, res) => {
    const uname = req.body.username;
    const pwd = req.body.password;
    for(let i=0; i<users.length; i++){
        let user = users[i];
        if(uname === user.username){
            return hasher({password:pwd, salt:user.salt}, (err, pass, salt, hash) => {
                if(hash === user.password){
                    req.session.displayName = user.displayName;
                    req.session.save(() => {
                        res.redirect('/auth/welcome');
                    })
                } else {
                    res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
                }
            })
        }
    res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
    // if(uname === user.username && sha256(pwd+user.salt) === user.password){
    //     req.session.displayName = user.displayName;
    //     return req.session.save(() => {
    //         res.redirect('/auth/welcome');
    //     })
    // }
} 
}

const logout = (req, res) => {
    delete req.session.displayName;
    req.session.save(() => {
        res.redirect('/auth/welcome');
    })
}

const Welcome = (req, res) => {
    if(req.session.displayName){
        res.send(`<h1>Hello, ${req.session.displayName}<h1><a href="/auth/logout">logout</a>`);
    } else {
        res.send(`<h1>Welcome</h1><a href="/auth/login">Login</a>`);
    }
}

const Register = (req, res) => {
    res.render('register');
}

const RegisterAction = (req, res) => {
    hasher({password:req.body.password}, (err, pass, salt, hash) => {
        const user = {
            username : req.body.username,
            password : hash,
            salt : salt,
            displayName : req.body.displayName
        };
        users.push(user);
        req.session.displayName = req.body.displayName;
        req.session.save(() => {
            res.redirect('/auth/welcome');
        });
    })
    
    
}

module.exports = {
    loginRoot,
    loginAction,
    logout,
    Welcome,
    Register, 
    RegisterAction
}