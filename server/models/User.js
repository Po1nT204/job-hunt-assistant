const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false, // Пароль не будет возвращаться в ответах на запросы по умолчанию
    },
    role: {
      type: String,
      enum: ['student', 'employer'],
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

// Middleware (hook) для хэширования пароля перед сохранением
UserSchema.pre('save', async function (next) {
  // Хэшируем пароль, только если он был изменен (или новый)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
