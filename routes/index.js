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