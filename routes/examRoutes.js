const express = require('express');
const examController = require('../controllers/examController');
const router = express.Router();

router.get('/', examController.startExam);

module.exports = router;
