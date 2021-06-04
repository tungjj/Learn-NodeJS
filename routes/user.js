const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController')
const auth = require('../middleware/user-middleware')

router.post('/create', user_controller.create )
router.post('/login', user_controller.login)
router.post('/logout', user_controller.logout)

router.get('/list', user_controller.user_list)
router.get('/me', auth, user_controller.me)

router.patch('/:id', user_controller.update)

router.delete('/:id', user_controller.delete)
module.exports = router