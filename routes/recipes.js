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
<<<<<<< HEAD
    const { url, name, description, source, cooktime, servings, calories, ingredients, instructions, tags } = req.body;
    const creater = req.session.user._id
    //create a new recipe in the db
    Recipe.create({ url, name, description, source, cooktime, servings, calories, ingredients, instructions, tags, creater })
=======
    const { name, description, source, cooktime, servings, calories, ingredients, instructions, tags } = req.body;
    const url = req.file.path
    console.log(req.file)
        //create a new recipe in the db
    Recipe.create({ url, name, description, source, cooktime, servings, calories, ingredients, instructions, tags })
>>>>>>> fe0dbf1562c6eb8d801364a716f53d9b9caad4d8
        .then(recipeFromDB => {
            console.log(recipeFromDB)
            res.redirect('/recipe/' + recipeFromDB._id)
        })
        .catch(err => {
            console.log(err);
            res.render('recipe/newRecipe')
        })
});


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