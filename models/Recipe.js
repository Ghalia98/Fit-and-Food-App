const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    creater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    description: String,
    source: String,
    cooktime: Number,
    servings: Number,
    calories: Number,
    instructions: {
        type: [String],
        required: true
    },

    ingredients: {
        type: [String],
        required: true
    },
    url: String,
    tags: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;