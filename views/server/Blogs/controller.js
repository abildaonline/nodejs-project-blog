const Blog = require('./Blog')
const User = require('../auth/User')
const fs = require('fs')
const path = require('path')

const createBlog = async (req, res) =>{
    if(req.file && req.body.title.length > 2 &&
        req.body.text.length > 2 &&  
        req.body.category.length > 2)
        {
            await new Blog({
                title: req.body.title,
                text: req.body.text,
                category: req.body.category,
                image: `/images/blogs/${req.file.filename}`,
                author: req.user._id
            }).save()
            res.redirect(`/admin/${req.user._id}`)
        }else{
            res.redirect('/new_blog?error=1')
        }
}



const editBlog = async (req, res) => {
    console.log("hey")
    if(req.file && req.body.title.length > 2 &&
        req.body.text.length > 2 &&
        req.body.category.length > 0 
        ){
            const blogs = await Blog.findById(req.body.id)
            console.log("Blog is " , blogs)
            blogs.title = req.body.title;
            blogs.text = req.body.text;
            blogs.category = req.body.category;
            blogs.image = `/images/blogs/${req.file.filename}`;
            blogs.author = req.user._id
            blogs.save()
            res.redirect('/admin/' + req.user._id)
        }else{
            res.redirect(`/edit/${req.body.id}?error=1`)
        }   
}


const deleteBlog = async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog){
        await Blog.deleteOne({_id: blog._id})       
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

const saveBlog = async (req, res) =>{
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findBlog = user.toWatch.filter(item => item._id == req.body.id);
        if(findBlog.length == 0){
            user.toWatch.push(req.body.id);
            user.save()
            res.send('Блог успешно сохранен')
        }else{
            res.send('Блог уже сохранен')
        }
    }
}


const deleteFromToWatch = async(req, res) => {
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i = 0; i < user.toWatch.length; i++){
            if(user.toWatch[i] == req.params.id){
                user.toWatch.splice(i, 1)
                user.save()
                res.send('Успешно удалено')
            }
        }
        // res.send('Данные не найдены')
    }
}


module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
    saveBlog,
    deleteFromToWatch
}