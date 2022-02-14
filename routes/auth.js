const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");


router.get('/signup', (req, res, next) => {
    res.render('authentication/signup')
})

router.post('/signup', (req, res, next) => {
    const { name, username, password, email, gender, age, city, url } = req.body
    // res.send(req.body)
    // is the password + 4 chars
    if (password.length < 4) {
        res.render('signup', { message: 'Your password needs to be min 4 chars' })
        return
    }
    if (username.length === 0) {
        res.render('authentication/signup', { message: 'Your username cannot be empty' })
        return
    }
    // validation passed
    // do we already have a user with that username in the db?
    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB !== null) {
                res.render('authentication/signup', { message: 'Username is alraedy taken' })
            } else {
                // we can use that username
                // and hash the password
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                // create the user
                User.create({ name, username, password: hash, email, gender, age, city, url })
                    .then(createdUser => {
                        console.log(createdUser)
                        res.redirect('/login')
                    })
                    .catch(err => next(err))
            }
        })


})

router.get('/login', (req, res, next) => {
    res.render('authentication/login')
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB === null) {
                res.render('authentication/login', { message: 'Invalid credentials' })
                return
            }
            if (bcrypt.compareSync(password, userFromDB.password)) {
                console.log('authenticated')
                req.session.user = userFromDB
                res.send(req.session.user)
                // res.redirect('/profile')
            } else {
                res.render('/login', {
                    message: 'Invalid Credentials'
                })
            }
        })
    res.render('authentication/login')
})

module.exports = router;