const express = require('express');
const router = express.Router();
const Categories = require("../Categories/Categories");
const User = require("../auth/user");
const Blog = require("../Blogs/Blog");



router.get('/', async(req, res) => {

    const options = {}
    const categoryModel = await Categories.findOne({key : req.query.category})
    if(categoryModel){
        options.category = categoryModel._id
        res.locals.category = req.query.category
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
        {
        title: new RegExp(req.query.search , 'i')
        },
        {
            text: new RegExp(req.query.search , 'i')
        }
        ]
        res.locals.search = req.query.search
    }
    
    const totalBlogs = await Blog.countDocuments(options)
    const allCategories = await Categories.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category', 'name')
    const user = req.user? await User.findById(req.user._id) : {}
    res.render('index', {categories: allCategories, user, blogs, pages : Math.ceil(totalBlogs / limit)});
});



router.get('/index', (req, res) => {
    res.render('index');
});




router.get('/personal_page/:id', async(req, res) => {
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch', populate: {path: 'category'}})
    if(user){
        res.render('personal_page', {user: user, loginUser: req.user});
    }
});

router.get('/admin/:id', async(req, res) =>{
    const user = await User.findById(req.params.id)
    const blogs = await Blog.find().populate('category').populate('author')
    res.render("adminProfile", {loginUser: req.user? req.user: {}, user: user, blogs: blogs})
})


router.get('/new_blog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('new_blog', {categories: allCategories, user: req.user? req.user: {}});
});

router.get('/edit/:id', async(req, res) =>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)
    res.render("editBlog", {categories: allCategories, user: req.user ? req.user: {}, blog})
})
router.get('/not-found', (req, res) => {
res.render("notFound")
})

router.get('/register', (req, res) => {
    res.render('register', {user: req.user? req.user: {}});
});

router.get('/login', (req, res) => {
    res.render('login', {user: req.user? req.user: {}});
});





router.get('/views/new_blog.ejs', (req, res) => {
    res.render('new_blog.ejs');
});

router.get('/views/personal_page_2.ejs', (req, res) => {
    res.render('personal_page_2.ejs');
});

router.get('/views/personal_page.ejs', (req, res) => {
    res.render('personal_page.ejs');
});  


module.exports = router;





























































































