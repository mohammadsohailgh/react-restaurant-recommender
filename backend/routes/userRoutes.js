const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, updatePreference, getPreference} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser) // /api/users when we hit this route we hit controller function registerUser
router.post('/login', loginUser) // /api/users when we hit this route we hit controller function registerUser
router.get('/me', protect, getMe) // /api/users when we hit this route we hit controller function registerUser
router.get('/preference', protect, getPreference) // /api/users when we hit this route we hit controller function registerUser
router.put('/preference/:id', protect, updatePreference) // /api/users when we hit this route we hit controller function registerUser

module.exports = router