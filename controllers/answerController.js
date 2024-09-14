const answerService = require('../services/answerService');
const { uploadToS3 } = require('../utils/s3Uploader'); // Utility for S3 uploads

// Create a new answer
exports.createAnswer = async (req, res) => {
  try {
   const { questionId,answerText } = req.body;
   console.log(req.user)
   let answerImageUrl = null;
   console.log(req.file)
   if (req.file) {
      answerImageUrl = await uploadToS3(req.file);
    }
    const answer = await answerService.createAnswer({questionId,answerText ,answerImageUrl, userId: req.user.id});
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all answers
exports.getAllAnswers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page is 1, limit is 10
    const paginationOptions = {
      userId: req.user.id,
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const { answers, totalAnswers } = await answerService.getAllAnswers(paginationOptions);

    res.status(200).json({
      totalAnswers,
      totalPages: Math.ceil(totalAnswers / limit),
      currentPage: page,
      answers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an answer by ID
exports.getAnswerById = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id, req.user.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const { answerText } = req.body;
    const userId = req.user.id; // Get the userId from the authenticated user
    let answerImageUrl = null;
    
    if (req.file) {
      answerImageUrl = await uploadToS3(req.file);
    }

    const answer = await answerService.updateAnswer(req.params.id, {
      answerText,
      answerImageUrl,
      userId // Ensure that only the user's answer can be updated
    });

    if (!answer) return res.status(404).json({ error: 'Answer not found or not authorized' });

    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an answer by ID if it belongs to the authenticated user
exports.deleteAnswer = async (req, res) => {
  try {
    const userId = req.user.id; // Get the userId from the authenticated user
    const result = await answerService.deleteAnswer(req.params.id, userId);

    if (!result) return res.status(404).json({ error: 'Answer not found or not authorized' });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
