const examService = require('../services/examService');

const startExam = async (req, res) => {
  try {
    const questions = await examService.startExam();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { startExam };
