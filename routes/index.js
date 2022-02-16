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
  console.log('usermeee', user)
  // so bascially the populate method only works on the find method
  // which is why I had to find all the recipes first then populate, then query the result with the current user id.
  Recipe.find().populate('creater')
    .then(() => {
      Recipe.find({ 'creater': user._id })
        .then(userRecipes => {
          res.render('user/profile', { user, recipe: userRecipes })
          console.log('my recipe:', userRecipes)
        })

    })

})

module.exports = router;