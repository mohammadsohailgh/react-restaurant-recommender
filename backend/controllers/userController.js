const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler') //handles exceptions
const User = require('../models/userModel')
const { response } = require('express')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            preference: user.preference,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            preference: user.preference,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')    
    }
    
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    // const {_id, name, email, role} = await User.findById(req.user.id) //req.user.id is whatever user has authenticated
    res.status(200).json({
            _id: res.user._id,
            name: res.user.name,
            email: res.user.email,
            role: res.user.role,
            preference: res.user.preference,
            token: generateToken(res.user._id)
        })    
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getPreference = asyncHandler(async (req, res) => {
    // const {_id, name, email, role} = await User.findById(req.user.id) //req.user.id is whatever user has authenticated
    res.status(200).json({
            preference: req.user.preference,
        })    
})


// @desc Update preference
// @route PUT /api/users/preference/:id
// @access Private
const updatePreference = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id); // getting goal by id
  
    if (!user) {
      // checking if goal exists
      res.status(400);
      throw new Error("User not found");
    }

    const appUser = await User.findById(req.user._id) //consider chainging to _id if doesnt work
  
    // Check for user
    if (!appUser) {
      res.status(401);
      throw new Error("User not found");
    }
  
    // Make sure the logged in user matches the user user
    if (user._id.toString() !== appUser._id.toString()) {
      res.status(401);
      throw new Error("User not authorised");
    }
  
    const updatedPreference = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.status(200).json({
        'preference': updatedPreference.preference
    });

  });

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    updatePreference,
    getPreference
}