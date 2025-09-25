const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  // 1. Проверяем результаты валидации
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // 2. Проверяем, не существует ли уже пользователь
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ msg: 'User with this email already exists' });
    }

    // 3. Создаем нового пользователя (пароль будет захэширован Mongoose pre-save hook'ом)
    user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    // 4. Создаем и возвращаем JWT токен
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Токен будет жить 5 часов
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
