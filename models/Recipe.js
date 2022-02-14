const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    name: String,
    source: String,
    cooktime: Number,
    servings: Number,
    calories: Number,
    instructions: [String],
    ingredients: [String],
    url: String,
    tags: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;