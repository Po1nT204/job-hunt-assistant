const User = require('../models/User');

// @desc    Получить данные текущего пользователя
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // req.user был добавлен в мидлвэре 'protect'
    // Мы ищем пользователя по ID из токена, но не возвращаем пароль
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
