const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth  = async (req, res, next) =>{
    try {
        console.log('Authen')
        const token = await req.header('Authentication').replace('ABC ', '')
        const decoded = await jwt.verify(token, 'thisismycommand')
        const user    = await User.findOne({'_id': decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).send('Please authenticate!')
    }
}

module.exports = auth