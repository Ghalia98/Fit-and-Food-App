const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'recipe-app',
        allowed_formats: 'jpg, png'
    }
})

//create a new storage for recipe images
// http://expressjs.com/en/resources/middleware/multer.html
const storage2 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'recipe-images',
        allowed_formats: 'jpg, png'
    }
})

const uploadRecipeImages = multer({ storage: storage2 })
const uploader = multer({ storage })

module.exports = {
    uploader,
    uploadRecipeImages
}