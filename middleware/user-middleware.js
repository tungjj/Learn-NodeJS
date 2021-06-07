const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth  = async (req, res, next) =>{
    try {
        console.log('Authen')
        const token = await req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = await jwt.verify(token, 'thisismycommand')
        const user    = await User.findOne({'_id': decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
        console.log(user)
        req.user = user
        next()
    } catch (error) {
        res.status(401).send('Please authenticate!')
    }
}

module.exports = auth