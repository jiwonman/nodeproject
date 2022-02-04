const passport = require('passport')
const LocalStrategy = require('passport-local')
const authDAO = require('../model/authDAO')
const bkfd = require('../middlewares/bkfd2')

module.exports = () => {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_pw',
        passReqToCallback: true,
    }, async(req, user_id, user_pw, done)=>{
        try {
            let parameter = {
                "user_id" : user_id,
                "user_pw" : user_pw,
                "displayName" : req.body.displayName,
            }
            const checkUser = await authDAO.checkUserID(parameter)
            const result = await bkfd.encryption(parameter)
            parameter.user_pw = result.hash;
            parameter.salt = result.salt;
            const insertuser = await authDAO.insertUser(parameter)
            const user = await authDAO.passportCheckUser(user_id)
            return done(null, user)

        } catch (error) {
            return done(null, false, { message: error })
        }
    }))
}