const express = require('express');
const {
  getVacancies,
  createVacancy,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
} = require('../controllers/vacancyController');
const { protect, isEmployer } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/vacancies - публичный роут для всех
// POST /api/vacancies - приватный роут, сначала проверяем токен (protect),
// затем проверяем роль (isEmployer), и только потом создаем вакансию
router.route('/').get(getVacancies).post(protect, isEmployer, createVacancy);

// Роут для /api/vacancies/:id
router
  .route('/:id')
  .get(getVacancyById) // Получение одной вакансии (публичный)
  .put(protect, isEmployer, updateVacancy) // Обновление (приватный)
  .delete(protect, isEmployer, deleteVacancy); // Удаление (приватный)

module.exports = router;
