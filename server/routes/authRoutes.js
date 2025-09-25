const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Правила валидации для регистрации, взятые из нашего api-spec.yaml
const registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 8 or more characters').isLength({
    min: 8,
  }),
  body('role', 'Role must be either student or employer').isIn([
    'student',
    'employer',
  ]),
];

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, registerUser);

// Правила валидации для логина
const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginValidation, loginUser);

module.exports = router;
