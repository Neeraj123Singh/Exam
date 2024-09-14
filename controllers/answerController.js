const answerService = require('../services/answerService');
const { uploadToS3 } = require('../utils/s3Uploader'); // Utility for S3 uploads

// Create a new answer
exports.createAnswer = async (req, res) => {
  try {
   const { questionId,answerText } = req.body;
   let answerImageUrl = null;
   console.log(req.file)
   if (req.file) {
      answerImageUrl = await uploadToS3(req.file);
    }
    const answer = await answerService.createAnswer({questionId,answerText ,answerImageUrl});
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all answers
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an answer by ID
exports.getAnswerById = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an answer by ID
exports.updateAnswer = async (req, res) => {
  try {
   const { answerText } = req.body;
   let answerImageUrl = null;
   if (req.file) {
      answerImageUrl = await uploadToS3(req.file);
    }
    const answer = await answerService.updateAnswer(req.params.id, {answerText,answerImageUrl});
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an answer by ID
exports.deleteAnswer = async (req, res) => {
  try {
    const result = await answerService.deleteAnswer(req.params.id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
