const mongoose = require('mongoose')
// const validator = require('validator')
var crypto = require('crypto');


const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,    
        trim: true,  
        required:   [true, "can't be blank"],
        // match:      [/^[a-zA-Z]+$/, 'is invalid'],
    },
    username: {
        type: String,     lowercase: true, 
        trim: true,       match:     [/^[a-zA-Z0-9]+$/, 'is invalid'],
        unique: true,     index:     true,
        required: [true, "can't be blank"],
    }, 
    email: {
        type: String,      lowercase: true,
        trim:  true,       match:     [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true,      index:     true,
        required: [true, "can't be blank"]
    },
    birthday: {
        
        type: Date,
        
    },
    gender: {
        type: String,  
        // match:   ['Male', 'Female', 'Other']
    },
    hash: String,
    salt: String
}, {timestamps: true});

// // set salt and hash the password for a user
// UserSchema.methods.setPassword = function(password){
//     // create unique salt for particular user
//     this.salt = crypto.randomBytes(16).toString('hex');

//     // hashing user's salt and password with 1000 iterations,
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
// }

// // Check the entered password is correct or not
// UserSchema.methods.validPassword = (password) =>{
//     let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
//     return this.hash === hash
// }

module.exports =  mongoose.model('User', UserSchema)