const { Question } = require('../models');

const createQuestion = async (data) => {
  const { questionType, questionText, imageUrl, options , answer} = data;
  const question = await Question.create({
    questionType,
    questionText,
    imageUrl,
    options,
    answer
  });
  return question;
};

const getRandomQuestions = async () => {
  const questions = await Question.findAll();
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

module.exports = { createQuestion, getRandomQuestions };
