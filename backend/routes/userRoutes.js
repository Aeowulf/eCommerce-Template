// Copied productRoutes.js to get started

import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
// Posts authUser data to the login page

router.route('/profile').get(protect, getUserProfile)
// Added protective middleware to Profile route

export default router