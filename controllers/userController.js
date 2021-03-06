var User =  require('../models/User')

require('../mongoose')

exports.user_list = function (req, res) {
    User.find({}, (err, users) => {
        var userMap = {}

        users.forEach((element) => {
            userMap[element.id] = users
        })      
        res.send(users)
    })  
} 

exports.create = (req, res) => {
    // khoi tao doi tuong co value tu request
    let user = new User( req.body )

    // save vao database
    user.save()
        .then( () => res.status(200).send("Save to database successfully.") )
        .catch( (error)=>{console.log(error)})

}

exports.update = async (req, res) =>{
    try {
        //valid chi cho update nhuwng gia tri trong allowed
        const updates = Object.keys(req.body)
        const allowedUpdates = ['fullname', 'age', 'password']
        const isValidOperator = updates.every((update) => allowedUpdates.includes(update))
        
        if(!isValidOperator){
            return res.status(404).send({error: 'Invalid update!'})
        }

        //tim va cap nhat
        // let user1 = await User.findByIdAndUpdate(req.params.id, 
        //                                     req.body, {new: true})  
        let user1 = await User.findById(req.params.id)
        // console.log(user1)
        updates.forEach(update => user1[update] = req.body[update])
        // console.log(user1)

        await user1.save()
        console.log(user1)

        // endpoint
        if(!user1){
            res.status(404).send("This user does not exist.")
        }
        // res.send( user1 )
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.delete = async (req, res) => {
    try {
        let user1 = await User.findByIdAndDelete(req.params.id) 
        
        if(!user1){
            return res.status(404).send()
        }
        res.send(user1)

    } catch (e) {
        res.status(500).send()
    }
}

exports.login = async (req, res) => {
    try {
        let user2 = await User.findByCredentials(req.body.username, req.body.password) //tim kiem xem co user trong db khong
        console.log(user2)
        await user2.authen(user2) // sinh jsonwebtoken cho user

        res.send( user2 )
    } catch (error) {
        res.status(400).send()
    }
   
}

exports.profile = async (req, res)=>{
    res.send(req.user)
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = await req.user.tokens.filter( (token) => token.token !== req.token )
        
        await req.user.updateOne(req.user)

        res.send('Logout success!')
    } catch (error) {
        res.status(500).send()
    }
    
}

