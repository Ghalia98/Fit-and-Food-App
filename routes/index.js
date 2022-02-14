const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User")

/* GET home page */
router.get("/", (req, res, next) => {

  // render a view
  res.render("index");

})



module.exports = router;