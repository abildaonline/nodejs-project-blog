const express = require('express')
const router = express.Router();
const {upload} = require('./multer')
const {createBlog, editBlog, deleteBlog, saveBlog, deleteFromToWatch} = require('./controller')
const {isAuth, isAdmin} = require('../auth/middlewares')

router.post('/api/blogs/new_blog', isAdmin, upload.single('image'), createBlog)
console.log("before")
router.post('/api/blogs/edit', isAdmin, upload.single('image'), editBlog)
console.log("after")
router.delete('/api/blogs/:id', isAdmin, deleteBlog)
router.post('/api/blogs/save', isAuth, saveBlog)
router.delete('/api/blogs/save/:id' , isAuth, deleteFromToWatch )

module.exports = router 