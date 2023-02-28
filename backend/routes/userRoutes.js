// Copied productRoutes.js to get started

import express from 'express'
import { 
  authUser, 
  registerUser, 
  getUserProfile, 
  updateUserProfile,
  getUsers
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', authUser)
// Posts authUser data to the login page

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router