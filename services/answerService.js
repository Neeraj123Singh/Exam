const { Answer } = require('../models');

// Create a new answer
exports.createAnswer = async (answerData) => {
  try {
   console.log(answerData)
    return await Answer.create(answerData);
  } catch (error) {
    throw new Error(`Error creating answer: ${error.message}`);
  }
};

// Get all answers
exports.getAllAnswers = async () => {
  try {
    return await Answer.findAll();
  } catch (error) {
    throw new Error(`Error retrieving answers: ${error.message}`);
  }
};

// Get an answer by ID
exports.getAnswerById = async (id) => {
  try {
    return await Answer.findByPk(id);
  } catch (error) {
    throw new Error(`Error retrieving answer with ID ${id}: ${error.message}`);
  }
};

// Update an answer by ID
exports.updateAnswer = async (id, updatedData) => {
  try {
    const answer = await Answer.findByPk(id);
    if (!answer) throw new Error(`Answer with ID ${id} not found`);
    return await answer.update(updatedData);
  } catch (error) {
    throw new Error(`Error updating answer with ID ${id}: ${error.message}`);
  }
};

// Delete an answer by ID
exports.deleteAnswer = async (id) => {
  try {
    const result = await Answer.destroy({ where: { id } });
    if (result === 0) throw new Error(`Answer with ID ${id} not found`);
    return result;
  } catch (error) {
    throw new Error(`Error deleting answer with ID ${id}: ${error.message}`);
  }
};
