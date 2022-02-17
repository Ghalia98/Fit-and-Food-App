const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { uploader, uploadRecipeImages, cloudinary } = require('../config/cloudinary');
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
    const publicId = req.file.filename
    //filter the empty inputs
    const filteredIngredients = ingredients.filter((ingredient) => ingredient.length > 0)
    const filteredInstructions = instructions.filter((step) => step.length > 0)
    //create a new recipe in the db
    Recipe.create({ url, publicId, name, description, source, cooktime, servings, calories, ingredients: filteredIngredients, instructions: filteredInstructions, tags, creater })
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
    Recipe.find({ 'name': { '$regex': ".*" + searchTerm + ".*", '$options': 'i' } })
        .then(recipe => {

            res.render("recipe/search", { recipe, searchTerm })
        })
        .catch(err => next(err))
})
router.get("/:id", (req, res, next) => {
    const id = req.params.id
    //console.log(id)
    Recipe.findById(id)
        .then(recipe => {
            //console.log(recipe)
            res.render("recipe/detail", { recipe: recipe })
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
router.post('/:id', uploadRecipeImages.single('url'), (req, res, next) => {
    const id = req.params.id
    const url = req.file.path
    const publicId = req.file.filename
    const { name, description, source, cooktime, servings, calories, ingredients, instructions, tags } = req.body;

    Recipe.findByIdAndUpdate(id, { url, name, description, source, cooktime, servings, calories, ingredients, instructions, tags, publicId })
        .then(recipeFromDB => {
            console.log("this is the clg ", recipeFromDB)
            if (recipeFromDB.url) {
                cloudinary.uploader.destroy(recipeFromDB.publicId)
            }
            res.redirect('/recipe/' + recipeFromDB._id)
        })
        .catch(err => next(err))
})
router.get('/:id/delete', (req, res, next) => {
    const id = req.params.id
    const user = req.session.user
    // if(req.session.user._id ===)
    if (req.session.user) {
        Recipe.find().populate('creater')
            .then(() => {
                Recipe.find({ 'creater': req.session.user._id })
                    .then(isUserRecipe => {
                        if (isUserRecipe) {
                            Recipe.findByIdAndDelete(id)
                                .then(recipeFromDB => {

                                    res.render('user/profile', { user })
                                })
                                .catch(err => next(err))
                        } else {
                            res.render("recipe/detail", { recipe: isUserRecipe })
                        }
                    })
            })
    } else {
        res.redirect(`/recipe/${id}`)
    }
})
module.exports = router;