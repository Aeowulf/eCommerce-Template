// Copy and pasted productController.js to get started

import asyncHandler from 'express-async-handler'

import generateToken from '../utils/generateToken.js'

import User from '../models/userModel.js'


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Requesting data sent in the body, destructuring to pull out the email and password

  const user = await User.findOne({ email })
  // Find one user document by email that matches email requested above

  if(user/* exists */ && (await user.matchPassword(password))/* password matches */) {
    // Return the following JSON data
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      // Added generateToken()
    })
  } else/* if user is not found or password doesn't match*/{
      res.status(401)
      // Return unauthorized error
      throw new Error('Invalid email or password')
      // Throw error message
  }
})

export { authUser }