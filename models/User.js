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


UserSchema.method("authen",async function(user){

    let token = await jwt.sign({_id: user._id.toString()}, "thisismycommand",
                                            {expiresIn: '1 day'}) //vietr lai cai nay

    console.log(token)
    let data = await jwt.verify(token, 'thisismycommand')
    console.log(data)

    await user.tokens.push({token})
    await user.updateOne(user)
})

UserSchema.pre('save', async function ()  {
  var user = this

	var salt = await bcrypt.genSalt(10)
	var hash = await bcrypt.hash(user.password, salt)
	
	user.password = hash
})

UserSchema.statics.findByCredentials = async function (username, password) {
    let user1 = await User.findOne({username})
    console.log(user1)
    if(!user1){
        throw new Error('Unable to login')
    }
    let isMatch = await bcrypt.compare(password, user1.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Eroor("User or password not true").send()
    }
    
    return user1
}

const User = mongoose.model('User', UserSchema)
module.exports = User

