const { validationResult } = require('express-validator');
const Vacancy = require('../models/Vacancy');

// @desc    Получить все вакансии
// @route   GET /api/vacancies
// @access  Public
exports.getVacancies = async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i'); // 'i' для поиска без учета регистра
      filter.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    if (req.query.location && req.query.location !== 'all') {
      const locationRegex = new RegExp(`^${req.query.location}$`, 'i');
      filter.location = locationRegex;
    }

    let sortOption = {};
    if (req.query.sort === 'salary_asc') {
      // Сортировка по полю salary по возрастанию (1)
      sortOption = { salary: 1 };
    } else if (req.query.sort === 'salary_desc') {
      // Сортировка по полю salary по убыванию (-1)
      sortOption = { salary: -1 };
    } else {
      // По умолчанию сортируем по дате создания (новые вверху)
      sortOption = { createdAt: -1 };
    }

    const vacancies = await Vacancy.find(filter)
      .populate('company', 'name email')
      .sort(sortOption);

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: errors
        .array()
        .map((err) => ({ field: err.path, message: err.msg })),
    });
  }
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: errors
        .array()
        .map((err) => ({ field: err.path, message: err.msg })),
    });
  }

  try {
    let vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ msg: 'Vacancy not found' });
    }

    // Проверяем, является ли текущий пользователь автором вакансии
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

    await vacancy.deleteOne();

    res.json({ msg: 'Vacancy removed successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
