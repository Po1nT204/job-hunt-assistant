const express = require('express');
const { getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Этот роут будет защищен. Сначала сработает 'protect',
// он достанет пользователя из токена и добавит в req,
// а затем сработает 'getMe'.
router.get('/me', protect, getMe);

module.exports = router;
