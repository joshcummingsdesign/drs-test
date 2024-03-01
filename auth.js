const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, eval('(' + id + ')'));
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = { id: 1, username: username };
        done(null, user);
    }
));

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
