const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
})



function loginCheck() {
  return (req, res, next) => {
    if (req.session.user) {
      // then the user making the request is logged in
      // therefore user can proceed
      console.log(req.session.user)
      next()
    } else {
      res.redirect('/login')
    }
  }

}

router.get('/profile', loginCheck(), (req, res, next) => {
  const user = req.session.user
  res.render('user/profile', { user })
})

module.exports = router;