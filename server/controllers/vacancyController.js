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

// @desc    Получить одну вакансию по ID
// @route   GET /api/vacancies/:id
// @access  Public
exports.getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id).populate(
      'company',
      'name email'
    );

    if (!vacancy) {
      return res.status(404).json({ msg: 'Vacancy not found' });
    }

    res.json(vacancy);
  } catch (error) {
    console.error(error.message);
    // Если ID невалидный, Mongoose выдаст ошибку, которую мы обработаем
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Vacancy not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Обновить вакансию
// @route   PUT /api/vacancies/:id
// @access  Private (Owner Employer)
exports.updateVacancy = async (req, res) => {
  try {
    let vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ msg: 'Vacancy not found' });
    }

    // Проверяем, является ли текущий пользователь автором вакансии
    // vacancy.company - это ObjectId, req.user.id - это строка. Приводим к строке для сравнения.
    if (vacancy.company.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'User not authorized to update this vacancy' });
    }

    vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Вернуть обновленный документ
      runValidators: true, // Применить валидаторы из схемы
    });

    res.json(vacancy);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Удалить вакансию
// @route   DELETE /api/vacancies/:id
// @access  Private (Owner Employer)
exports.deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ msg: 'Vacancy not found' });
    }

    // Проверяем, является ли текущий пользователь автором вакансии
    if (vacancy.company.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'User not authorized to delete this vacancy' });
    }

    await vacancy.deleteOne(); // Используем новый метод вместо .remove()

    res.json({ msg: 'Vacancy removed successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
