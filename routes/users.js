const { router } = require("../app");



function loginCheck() {
    return (req, res, next) => {
        if (req.session.user) {
            // then the user making the request is logged in
            // therefore user can proceed
            next()
        } else {
            res.redirect('/login')
        }
    }

}

router.get('/profile', loginCheck(), (req, res, next) => {
    const user = req.session.user
    res.render('/user/profile', { user })
})