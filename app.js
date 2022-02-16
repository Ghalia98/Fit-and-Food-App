// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "recipe-app";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// https://cloudinary.com/documentation/resizing_and_cropping#scale.
hbs.registerHelper('cloudinaryResize', function(url, transform) {
    if (!url.indexOf(/cloudinary\.com/)) {
        return url;
    }

    return url.replace(/image\/upload\/v[0-9]+/g, `image/upload/${transform}`);
});

// session configuration
const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/recipe-app'
        })
    })
)

app.use(function(req, res, next) {
    res.locals.session = req.session;

    next();
});
// end of session configuration

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const recipes = require("./routes/recipes");
app.use("/recipe", recipes);

const auth = require("./routes/auth");
app.use("/auth", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;