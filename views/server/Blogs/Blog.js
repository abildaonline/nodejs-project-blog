const mongoose =require('mongoose');
const Schema = mongoose.Schema


const BlogSchema = new mongoose.Schema({
    title: String,
    text: String,
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    image: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model('blog', BlogSchema)