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
      // Return "Unauthorized" error
      throw new Error('Invalid email or password')
      // Throw error message
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Requesting data sent in the body, destructuring to pull out the name, email and password

  const userExists = await User.findOne({ email })
  // Find one user document by email that matches email requested above

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
      res.status(201).json({
        _id:      user._id                ,
        name:     user.name               ,
        email:    user.email              ,
        isAdmin:  user.isAdmin            ,
        token:    generateToken(user._id) ,
      })
  } else {
      res.status(400)

      throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
      res.json({
        _id:      user._id    ,
        name:     user.name   ,
        email:    user.email  ,
        isAdmin:  user.isAdmin,
      })
  } else {
      res.status(404)
      throw new Error('User not found')
  }
})

export { authUser, registerUser, getUserProfile }