const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User")

/* GET home page */
router.get("/", (req, res, next) => {
<<<<<<< HEAD
  res.render("index");
=======

    // render a view
    res.render("index");

>>>>>>> 42b6e491ee6e4a88eca2d664d089a0e75f5746fa
})

function loginCheck() {
<<<<<<< HEAD
  return (req, res, next) => {
    if (req.session.user) {
      // then the user making the request is logged in
      // therefore user can proceed
      console.log(req.session.user)
      next()
    } else {
      res.redirect('/login')
=======
    return (req, res, next) => {
        if (req.session.user) {
            // then the user making the request is logged in
            // therefore user can proceed
            next()
        } else {
            res.redirect('/login')
        }
>>>>>>> 42b6e491ee6e4a88eca2d664d089a0e75f5746fa
    }

}

router.get('/profile', loginCheck(), (req, res, next) => {
    const user = req.session.user
    res.render('user/profile', { user })
})

module.exports = router;