const mongoose = require('mongoose')


// connect to database
mongoose.connect('mongodb://localhost:27017/test-mongoose', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
})

//// create schema
////////////////// create mongoose.model

// having some new object
// let user = new userModel({
//     name: ' B C D  ',
//     age: '14'
// })
