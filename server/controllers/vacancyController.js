const Vacancy = require('../models/Vacancy');

// @desc    Получить все вакансии
// @route   GET /api/vacancies
// @access  Public
exports.getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find().populate('company', 'name email');
    res.json(vacancies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Создать новую вакансию
// @route   POST /api/vacancies
// @access  Private (Employer)
exports.createVacancy = async (req, res) => {
  const { title, description, location, salary } = req.body;

  try {
    const newVacancy = new Vacancy({
      title,
      description,
      location,
      salary,
      company: req.user.id, // ID пользователя берется из middleware `protect`
    });

    const vacancy = await newVacancy.save();
    res.status(201).json(vacancy);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
