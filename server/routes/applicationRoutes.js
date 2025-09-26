const express = require('express');
const {
  createApplication,
  getMyApplications,
} = require('../controllers/applicationController');
const { protect, isStudent } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/applications
// @desc    Создать новый отклик на вакансию
// @access  Private (Student)
router.route('/').post(protect, isStudent, createApplication);

// @route   GET /api/applications/my
// @desc    Получить все отклики текущего студента
// @access  Private (Student)
router.route('/my').get(protect, isStudent, getMyApplications);

module.exports = router;
