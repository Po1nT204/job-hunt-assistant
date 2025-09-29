const express = require('express');
const { body } = require('express-validator');
const {
  createApplication,
  getMyApplications,
} = require('../controllers/applicationController');
const { protect, isStudent } = require('../middleware/authMiddleware');

const router = express.Router();

// Правила валидации для создания отклика
const createApplicationValidation = [
  body('vacancyId', 'Vacancy ID is required').not().isEmpty(),
  body('vacancyId', 'Invalid Vacancy ID').isMongoId(),
  body('coverLetter', 'Cover letter is required').not().isEmpty(),
  body(
    'coverLetter',
    'Cover letter must be between 50 and 2000 characters'
  ).isLength({ min: 50, max: 2000 }),
];

// Применяем валидацию к роуту
router
  .route('/')
  .post(protect, isStudent, createApplicationValidation, createApplication);

router.route('/my').get(protect, isStudent, getMyApplications);

module.exports = router;
