const express = require('express');
const router = express.Router();
const multer = require('multer');
const answerController = require('../controllers/answerController');

const upload = multer({ dest: 'uploads/' });

// Define routes
router.post('/', upload.single('image'),answerController.createAnswer);
router.get('/', answerController.getAllAnswers);
router.get('/:id', answerController.getAnswerById);
router.put('/:id', upload.single('image'),answerController.updateAnswer);
router.delete('/:id', answerController.deleteAnswer);

module.exports = router;
