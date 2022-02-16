const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { uploadRecipeImages } = require('../config/cloudinary');


//user want to add a new recipe
router.get("/new", (req, res, next) => {
    console.log(req.session);
    // res.render("new-recipe");
    User.find({})
        .then(userfromDB => {
            res.render('recipe/newRecipe', { userfromDB })
        })
        .catch(err => next(err))
})

router.post('/new', uploadRecipeImages.single('url'), (req, res, next) => {
    // get the values from request body. Create an object with keys.
    const { url, name, description, source, cooktime, servings, calories, ingredients, instructions, tags } = req.body;
    const creater = req.session.user._id
    //create a new recipe in the db
    Recipe.create({ url, name, description, source, cooktime, servings, calories, ingredients, instructions, tags, creater })
        .then(recipeFromDB => {
            console.log(recipeFromDB)
            res.redirect('/recipe/' + recipeFromDB._id)
        })
        .catch(err => {
            console.log(err);
            res.render('recipe/newRecipe')
        })
});

router.get("/search", (req, res, next) => {

    let searchTerm = req.query.recipeTitle

    Recipe.find( { 'name' : { '$regex' : ".*" + searchTerm + ".*", '$options' : 'i' } } )
        .then(recipe => {
            console.log(recipe)
            res.render("recipe/search", {recipe})
        })
        .catch(err => next(err))
})

router.get("/:id", (req, res, next) => {

    const id = req.params.id
    console.log(id)
    Recipe.findById(id)
        .then(recipe => {
            console.log(recipe)
            res.render("recipe/detail", { recipe: recipe })
        })
        .catch(err => next(err))
})



module.exports = router;