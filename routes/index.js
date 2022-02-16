const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User")

/* GET home page */
router.get("/", (req, res, next) => {
    // https://docs.mongodb.com/manual/reference/operator/aggregation/sample/
    //random recipe on homepage
    Promise.all([
            Recipe.aggregate([{ '$sample': { size: 5 } }]),
            Recipe.aggregate([{ '$sample': { size: 4 } }])
        ])
        .then(([featureRecipes, gridRecipes]) => {
            res.render('index', { featureRecipes, gridRecipes, doctitle: 'Homepage' })
        })
        .catch(err => next(err));
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
<<<<<<< HEAD
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

=======
    const user = req.session.user
    res.render('user/profile', { user })
>>>>>>> fe0dbf1562c6eb8d801364a716f53d9b9caad4d8
})

module.exports = router;