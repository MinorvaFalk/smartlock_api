const express = require('express')
const router = express.Router()

const {
    getAllUsers,
    getSpecificUsers,
    createUser
} = require('../controllers/users')

const jwtHandler = require('../middleware/jwtHandler')
router.use(jwtHandler)

// Get all
router.get('/', getAllUsers)

router.get('/create', createUser)
  
// Get specific nim
router.get('/:nim', getSpecificUsers)



module.exports = router