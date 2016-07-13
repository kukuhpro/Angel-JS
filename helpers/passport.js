var LocalStrategy = require('passport-local').Strategy
var root = require('path').resolve();
var models = require(root + '/helpers/models');
var bcrypt = require('bcryptjs');

module.exports = function(app, passport) {
    passport.serializeUser(function(req, user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(req, id, done) {
        var User = models.load('User', req.session.subdomain);
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            var User = models.load('User', req.params.domain);
            User.findOne({ email: email, access: 2 }, function(err, user) {
                if (err) {
                    return done(err, false)
                }
                else if (!user) {
                    return done(null, false)
                }
                else if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false)
                } else {
                    req.session.user      = user;
                    req.session.subdomain = req.params.domain;
                    return done(null, user)
                }
            });
        }
    ))
}
