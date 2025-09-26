const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware для проверки токена (защита роутов)
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Получаем токен из хедера 'Bearer <token>'
      token = req.headers.authorization.split(' ')[1];

      // Верифицируем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Находим пользователя по ID из токена и добавляем его в объект запроса (req)
      // Исключаем поле password из результата
      req.user = await User.findById(decoded.user.id).select('-password');

      next(); // Передаем управление следующему middleware или контроллеру
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

// Middleware для проверки роли 'employer'
exports.isEmployer = (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Employer role required.' });
  }
};
