const { Answer } = require('../models');

// Create a new answer
exports.createAnswer = async (answerData) => {
  try {
    return await Answer.create(answerData);
  } catch (error) {
    throw new Error(`Error creating answer: ${error.message}`);
  }
};

// Get all answers
exports.getAllAnswers = async ({ userId, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;

  // Get answers with pagination and count total answers
  const { rows: answers, count: totalAnswers } = await Answer.findAndCountAll({
    where: { userId },
    limit,
    offset,
  });

  return {
    answers,
    totalAnswers,
  };
};

// Get an answer by ID
exports.getAnswerById = async (id, userId) => {
  try {
    return await Answer.findOne({ where: { id, userId } });
  } catch (error) {
    throw new Error(`Error retrieving answer with ID ${id}: ${error.message}`);
  }
};

exports.updateAnswer = async (id, data) => {
  try {
    const answer = await Answer.findOne({ where: { id, userId: data.userId } });
    if (!answer) return null;
    return await answer.update(data);
  } catch (error) {
    throw new Error(`Error retrieving answer with ID ${id}: ${error.message}`);
  }
};

// Delete an answer by ID and userId
exports.deleteAnswer = async (id, userId) => {
  try{
    const answer = await Answer.findOne({ where: { id, userId } });
    if (!answer) return null;
    return await answer.destroy();
  }catch(error) {
    throw new Error(`Error retrieving answer with ID ${id}: ${error.message}`);
  }
};