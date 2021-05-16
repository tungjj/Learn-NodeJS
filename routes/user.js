const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController')


router.post('/create', user_controller.user_create_post, (req, res) => {
    res.render('/list')
} )

router.get('/list', user_controller.user_list)

module.exports = router