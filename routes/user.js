const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController')


router.post('/create', user_controller.create )
router.post('/login', user_controller.login)

router.get('/list', user_controller.user_list)

router.patch('/:id', user_controller.update)

router.delete('/:id', user_controller.delete)
module.exports = router