const express = require('express');
const {
  getVacancies,
  createVacancy,
} = require('../controllers/vacancyController');
const { protect, isEmployer } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/vacancies - публичный роут для всех
// POST /api/vacancies - приватный роут, сначала проверяем токен (protect),
// затем проверяем роль (isEmployer), и только потом создаем вакансию
router.route('/').get(getVacancies).post(protect, isEmployer, createVacancy);

module.exports = router;
