const passport = require("passport");
const user = require("../auth/user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local");


passport.use(
    new localStrategy(
        {
        usernameField: "email",
        passwordField: "password",
    },
    function (email, password, done) {
        user
            .findOne({ email })
            .then((user) => {
            if(user.password){
                bcrypt.compare(password, user.password, function (err, result) {  
                    if (err) {
                        return done(err);
                    }
                    if (result) {
                        return done(null, user);
                    }
            });
            }else{
                return done('Пользователь не найден')
            }
        })
        .catch((e) => {
                return done(e);
            });
        }
    )
);









passport.serializeUser(function (user, done) {
    done(null, user._id);
});


passport.deserializeUser(function (id, done) {
    user
        .findById(id)
        .then((user) => {
            console.log(user);
            done(null, user);
        })
        .catch((err) => {
            done;
            err, null;
        });
});