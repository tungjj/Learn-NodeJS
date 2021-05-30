const mongoose = require('mongoose')
// const validator = require('validator')
var bcrypt = require('bcryptjs')
// can chuyen sang dang import cua ES6
const jwt = require('jsonwebtoken')

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
    password: {
        type: String,     
           
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
    tokens: [
        {token: {
            type: String,
            require: true
        } }
    ]
});

UserSchema.methods.generateAuthToken = async function (){
    let user = this
    let token = jwt.sign({_id: user._id.toString()}, 'thisismykey')

    user.tokens.concat({token})
    await user.save()

    return token
}

UserSchema.pre('save', async function ()  {
  var user = this

	var salt = await bcrypt.genSalt(10)
	var hash = await bcrypt.hash(user.password, salt)
	
	user.password = hash
})

UserSchema.statics.findByCredentials = async function (username, password) {
    let user1 = await User.findOne({username: username})

    if(!user1){
        throw new Error('Unable to login')
    }

    let isMatch = await bcrypt.compare(password, user1.password)

    if(!isMatch){
        throw new Eroor("User or password not true")
    }

    return user1
}

const User = mongoose.model('User', UserSchema)
module.exports = User

