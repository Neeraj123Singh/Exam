const express = require('express');
const multer = require('multer');
const questionController = require('../controllers/questionController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Multer for handling file uploads

router.post('/', upload.single('image'), questionController.createQuestion);

module.exports = router;
