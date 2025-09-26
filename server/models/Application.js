const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    vacancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vacancy',
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
      required: [true, 'Please provide a cover letter'],
      minlength: 50,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс, чтобы один студент не мог откликнуться на одну и ту же вакансию дважды
ApplicationSchema.index({ vacancy: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
