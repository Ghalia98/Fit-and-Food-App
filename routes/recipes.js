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
    const { name, description, source, cooktime, servings, calories, ingredients, instructions, tags } = req.body;
    const url = req.file.path
    const creater = req.session.user._id
        //filter the empty inputs
    const filteredIngredients = ingredients.filter((ingredient) => ingredient.length > 0)
    const filteredInstructions = instructions.filter((step) => step.length > 0)

    //create a new recipe in the db
    Recipe.create({ url, name, description, source, cooktime, servings, calories, ingredients: filteredIngredients, instructions: filteredInstructions, tags, creater })
        .then(recipeFromDB => {
            console.log(recipeFromDB)
            //console.log(recipeFromDB.url)
            res.redirect('/recipe/' + recipeFromDB._id)
        })
        .catch(err => {
            console.log(err);
            res.render('recipe/newRecipe')
        })
});

router.get("/search", (req, res, next) => {

    let searchTerm = req.query.recipeTitle

    Recipe.find({ 'name': { '$regex': ".*" + searchTerm + ".*", '$options': 'i' } })
        .then(recipe => {
            
            res.render("recipe/search", {recipe, searchTerm})
        })
        .catch(err => next(err))
})



router.get("/:id", (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Recipe.findById(id)
        .then(recipe => {
            res.render("recipe/detail", { recipe: recipe })
        })
        .catch(err => next(err))
})


router.get('/:id/delete', (req, res, next) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => next(err))
})


router.get(`/:id/edit`, (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(recipesFromDB => {
            res.render('recipe/edit', {
                recipe: recipesFromDB
            })
        })
        .catch(err => next(err))
})

// edit recipes
router.post('/:id', (req, res, next) => {
    const id = req.params.id
    const { name, ingredients, instructions, description, _id } = req.body
    Recipe.findByIdAndUpdate(id, {
        name, ingredients, instructions, description, _id
    }, { new: true })
        .then(updatedRecipe => {
            res.redirect(`/${id}`)
        })
        .catch(err => next(err))
})




module.exports = router;