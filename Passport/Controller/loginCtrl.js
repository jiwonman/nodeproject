const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

const loginRoot = (req, res) => {
    res.render('login');
}

const users = [{
    username : 'jiwon',
    password : 'fzblKcd9B0z6rhrsUNcIQz7dpJ8YLINrntkbYtIE+Oj6pI9vsO+S5+fQ5HM9pruj4jnL3WENcd0mxHugK8SHC1vbKrl5zbg0j0QuGG1ouSE7Y7YdF+CoyX1t5eNNiM0vqOU6Qa+BlgTnJfO3wNlcTuJDYUSc54yzXqpa3md4JsE=',
    displayName : 'JiwonMan',
    salt : 'BjtssC1fP2cn7SReanndz5bbcCh0XbqzAO1H4qk0Ibv8VaRtEXnCH/goQn2OihM3y9DWtsMMU1f4uPT9XPI1CQ=='
}];

const Passport = (username, password, done) => {
        const uname = username;
        const pwd = password;
        for(let i=0; i<users.length; i++){
            let user = users[i];
            if(uname === user.username){
                return hasher({password:pwd, salt:user.salt}, (err, pass, salt, hash) => {
                    if(hash === user.password){
                        console.log('LoclaStrategy', user);
                        done(null, user);               //로그인 절차가 끝냈는데 성공(user는 객체로 사용)
                        // req.session.displayName = user.displayName;
                        // req.session.save(() => {
                        //     res.redirect('/auth/welcome');
                        // })
                    } else {
                        done(null, false, user, {message: 'Incorrect password.'});        //로그인 절차가 끝났는데 실패 null : (err)
                        // res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
                    }
                });
            }
        }
    done(null, false, {message: 'Incorrect username.'});
    // res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
    };

const loginAction = {
    successRedirect: '/auth/welcome',           // 성공적으로 데이터를 받아오면 
    failureRedirect: '/auth/login',             // 성공적인 데이터를 받아오는데 실패하면
    failureFlash: false                         // Flash 기법을 사용하여 사용자에게 인증 실패 메시지를 표현해 줄 수 있다.
};  // => {
    // const uname = req.body.username;
    // const pwd = req.body.password;
    // for(let i=0; i<users.length; i++){
    //     let user = users[i];
    //     if(uname === user.username){
    //         return hasher({password:pwd, salt:user.salt}, (err, pass, salt, hash) => {
    //             if(hash === user.password){
    //                 req.session.displayName = user.displayName;
    //                 req.session.save(() => {
    //                     res.redirect('/auth/welcome');
    //                 })
    //             } else {
    //                 res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
    //             }
    //         })
    //     }
    // if(uname === user.username && sha256(pwd+user.salt) === user.password){
    //     req.session.displayName = user.displayName;
    //     return req.session.save(() => {
    //         res.redirect('/auth/welcome');
    //     })
    // }
// };   

const logout = (req, res) => {
    req.logout();
    // delete req.session.displayName;
    res.redirect('/auth/welcome');
}

const Welcome = (req, res) => {
    console.log('welcome', req.user);
    if(req.user && req.user.displayName){
        res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
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

const RegisterAction = (req, res) => {
    hasher({password:req.body.password}, (err, pass, salt, hash) => {
        const user = {
            username : req.body.username,
            password : hash,
            salt : salt,
            displayName : req.body.displayName
        };
        users.push(user);
        req.login(user, (err) => {
            req.session.displayName = req.body.displayName;
            req.session.save(() => {
                res.redirect('/auth/welcome');
            });
        });
    });
};

const serialize = (user, done) => {           //사용자가 맞다면 실행되는 done의 두번째 인자가 false가 아니라면, serializeUser함수로 인해서 등록한 콜백함수가 실행되도록 약속 
    console.log('serializeUser', user);
    done(null, user.username);
};

const deserialize = (id, done) => {     //serializeUser 가 실행되면 deserializeUser가 실행되기로 약속
    console.log('deserializeUser', id);
    let user;
    for(let i=0; i<users.length; i++){
        user = users[i];
        if(user.username === id){
            return done(null, user);
        }
    }
};

module.exports = {
    loginRoot,
    loginAction,
    logout,
    Welcome,
    Register, 
    RegisterAction,
    Passport,
    serialize,
    deserialize
};