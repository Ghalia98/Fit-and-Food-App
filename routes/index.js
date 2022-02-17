const router = require("express").Router();
const Recipe = require("../models/Recipe");
const Event = require("../models/Event");
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
    const user = req.session.user
    console.log('usermeee', user)
    // so bascially the populate method only works on the find method
    // which is why I had to find all the recipes first then populate, then query the result with the current user id.
    Recipe.find().populate('creater')
        .then(() => {
            Recipe.find({ 'creater': user._id })
                .then(userRecipes => {
                    Event.find().populate('creater')
                        .then(() => {
                            Event.find({ 'creater': user._id })
                                .then(userEvents => {
                                    res.render('user/profile', { user, event: userEvents, recipe: userRecipes })
                                    console.log('my event:', userEvents)
                                })
                        })
                    // res.render('user/profile', { user, recipe: userRecipes })
                    console.log('my recipe:', userRecipes)
                })

        })

})

router.get('/profile/:id', loginCheck(), (req, res, next) => {
    const userId = req.params.id
    Recipe.find()
        .then(() => {
            Recipe.find({ 'creater': userId })
                .then(userRecipes => {
                    User.findById(userId)
                        .then(user => {
                            res.render('user/profile', { user, recipe: userRecipes })
                        })    
                })

        })

})

module.exports = router;