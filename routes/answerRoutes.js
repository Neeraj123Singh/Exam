const express = require('express');
const router = express.Router();
const multer = require('multer');
const answerController = require('../controllers/answerController');

const {authenticateToken} = require("../helper/authHelper.js");

const upload = multer({ dest: 'uploads/' });

// Define routes
router.post('/', authenticateToken,upload.single('image'),answerController.createAnswer);
router.get('/', authenticateToken,answerController.getAllAnswers);
router.get('/:id', authenticateToken,answerController.getAnswerById);
router.put('/:id', authenticateToken,upload.single('image'),answerController.updateAnswer);
router.delete('/:id', authenticateToken,answerController.deleteAnswer);

module.exports = router;
