const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog').then(() => {
    console.log('MongoDB Connected');
}).catch((e) =>{
    console.log('Error connecting to MongoDB:', error.message);
})