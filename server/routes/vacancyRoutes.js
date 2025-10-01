const express = require('express');
const { body } = require('express-validator');
const {
  getVacancies,
  createVacancy,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
} = require('../controllers/vacancyController');
const { protect, isEmployer } = require('../middleware/authMiddleware');

const router = express.Router();

// Правила валидации для создания/обновления вакансии
const vacancyValidation = [
  body('title', 'Title is required').not().isEmpty(),
  body('title', 'Title must be less than 100 characters').isLength({
    max: 100,
  }),
  body('description', 'Description is required').not().isEmpty(),
  body('description', 'Description must be less than 5000 characters').isLength(
    { max: 5000 }
  ),
  body('location', 'Location is required').not().isEmpty(),
  body('salary', 'Salary must be a positive number')
    .optional()
    .isNumeric({ no_symbols: true }),
];

router
  .route('/')
  .get(getVacancies)
  .post(protect, isEmployer, vacancyValidation, createVacancy);

router
  .route('/:id')
  .get(getVacancyById)
  .put(protect, isEmployer, vacancyValidation, updateVacancy)
  .delete(protect, isEmployer, deleteVacancy);

module.exports = router;
