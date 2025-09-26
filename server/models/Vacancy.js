const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: 5000,
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    salary: {
      type: Number,
    },
    // Связь с моделью User, чтобы мы знали, какой работодатель создал вакансию
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vacancy', VacancySchema);
