var User = require('../models/User')
require('../mongoose')

exports.user_list = function (req, res) {
    User.find({}, (err, users) => {
        var userMap = {}

        users.forEach((element) => {
            userMap[element.id] = users
        })
        
        res.send(userMap)
        // res.send('Hello response')
    })  
} 

exports.user_create_get = (req, res) => {
    res.send("Create user successfully!!")
}

exports.user_create_post = (req, res) => {
    // khoi tao doi tuong co value tu request
    let user = new User( req.body )

    // save vao database
    user.save()
        .then( () => console.log('Save to database successfully.') )
        .catch( (error)=>{console.log(error)})
    
    //redirect to list for showing that success
    // res.redirect(307, 'http://localhost:3000/user/list');
    res.render('http://localhost:3000/user/list')
}