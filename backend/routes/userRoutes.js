// Copied productRoutes.js to get started

import express from 'express'
import { authUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser)
// Posts authUser data to the login page

export default router