const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User")


router.get("/:id", (req, res, next) => {

    const id = req.params.id
	console.log(id)
	Recipe.findById(id)
		.then(recipe => {
			console.log(recipe)
			res.render("../views/recipe/detail.hbs", {recipe: recipe})
		})
		.catch(err => next(err))
  })
  
  module.exports = router;