const router = require("express").Router();
const User = require("../models/User");
const Event = require("../models/Event");
const { uploader, uploadRecipeImages, cloudinary, uploadEventImages } = require('../config/cloudinary');

//Create a new Event
router.get("/new", (req, res, next) => {
    console.log(req.session);
    User.find({})
        .then(userfromDB => {
            res.render('event/new-event', { userfromDB })
        })
        .catch(err => next(err))
})

router.post('/new', uploadEventImages.single('img'), (req, res, next) => {
    const { title, startDate, startTime, endTime, location, description, tags } = req.body;
    const img = req.file.path
    const creater = req.session.user._id
    const publicId = req.file.filename
    Event.create({ img, publicId, title, creater, startDate, startTime, endTime, location, description, tags })
        .then(eventFromDB => {
            console.log(eventFromDB)
            res.redirect('/event/' + eventFromDB._id)
        })
        .catch(err => {
            console.log(err);
            res.render('event/new-event')
        })
});


// search Event
router.get("/search", (req, res, next) => {
    let searchTerm = req.query.eventTitle

    Event.find({ 'title': { '$regex': ".*" + searchTerm + ".*", '$options': 'i' } }).populate('creater')
        // https://docs.mongodb.com/manual/reference/method/cursor.sort/#ascending-descending-sort
        .sort({ startDate: 1, startTime: 1 })
        .then(event => {
            res.render("event/search", { event, searchTerm })
        })
        .catch(err => next(err))
})


//Event details page
router.get("/:id", (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Event.findById(id)
        .populate('creater')
        .then(event => {
            console.log(event)
            let showDelete;
            if (!req.session.user) {
                showDelete = false
            }
            else {
                showDelete = req.session.user._id == event.creater._id
                console.log(showDelete)
            }
            res.render("event/details", { event: event, showDelete })
        })
        .catch(err => next(err))
})

//Editing Events
router.get('/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Event.findById(id)
        .then(event => {
            console.log(event)
            res.render('event/edit', { event, doctitle: 'Edit the event' })
        })
        .catch(err => next(err));
})

// edit recipes
router.post('/:id', uploadEventImages.single('img'), (req, res, next) => {
    const id = req.params.id
    const img = req.file.path
    const publicId = req.file.filename
    const { title, startDate, startTime, endTime, location, description, tags } = req.body;

    Event.findByIdAndUpdate(id, { img, publicId, title, startDate, startTime, endTime, location, description, tags })
        .then(event => {
            console.log("this is the changed event", event)
            if (event.img) {
                cloudinary.uploader.destroy(event.publicId)
            }
            res.redirect('/event/' + event._id)
        })
        .catch(err => next(err))
})


//delete Events
router.get('/:id/delete', (req, res, next) => {
    const id = req.params.id
    const { title, startDate, startTime, endTime, location, description, tags } = req.body;
    Event.findByIdAndRemove(id, { title, startDate, startTime, endTime, location, description, tags })
        .then(event => {
            console.log("this is the removed event", event)
            if (event.img) {
                cloudinary.uploader.destroy(event.publicId)
            }
            res.redirect('/')
        })
        .catch(err => next(err))
})


module.exports = router;