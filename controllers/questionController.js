const questionService = require('../services/questionService');
const { uploadToS3 } = require('../utils/s3Uploader'); // Utility for S3 uploads

const createQuestion = async (req, res) => {
  try {
    const { questionType, questionText, options, answer } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }
    const question = await questionService.createQuestion({
      questionType, questionText, options, imageUrl, answer
    });
    res.status(201).json({ sucess:true,question });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something Went Wrong", data:null });
  }
};

module.exports = { createQuestion };
