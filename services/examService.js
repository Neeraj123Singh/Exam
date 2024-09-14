const { getRandomQuestions } = require('./questionService');

const startExam = async () => {
  const questions = await getRandomQuestions();
  return questions;
};

module.exports = { startExam };
