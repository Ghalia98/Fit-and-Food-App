const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User")


router.get("/new-recipe", (req, res, next) => {
    res.render("new-recipe");
})

router.post('path', (req, res) => {

});





module.exports = router;