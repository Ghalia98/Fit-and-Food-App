const router = require("express").Router();
const bcrypt = require('bcryptjs')
// const User = require('../models/User.js')

router.get('/signup', (req, res, next) => {
    res.render('authentication/signup')
})

// router.post('/signup', (req, res, next) => {
//     res.render('signup')
// })

module.exports = router;