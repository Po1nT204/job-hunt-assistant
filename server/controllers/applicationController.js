const Application = require('../models/Application');
const Vacancy = require('../models/Vacancy');

// @desc    Создать новый отклик
// @route   POST /api/applications
// @access  Private (Student)
exports.createApplication = async (req, res) => {
  const { vacancyId, coverLetter } = req.body;

  try {
    // Проверяем, существует ли вакансия
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ msg: 'Vacancy not found' });
    }

    // Проверяем, не откликался ли студент уже
    const existingApplication = await Application.findOne({
      vacancy: vacancyId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ msg: 'You have already applied for this vacancy' });
    }

    const newApplication = new Application({
      vacancy: vacancyId,
      applicant: req.user.id,
      coverLetter,
    });

    const application = await newApplication.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error.message);
    // Обработка ошибки уникального индекса
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ msg: 'You have already applied for this vacancy' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Получить мои отклики
// @route   GET /api/applications/my
// @access  Private (Student)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate('vacancy', 'title location'); // Добавляем к отклику название и локацию вакансии

    res.json(applications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
