const express = require('express');
const router = express.Router();

const bookshelfController = require('../controllers/bookshelf.controller');

router.post('', bookshelfController.addBookshelf);
router.delete('', bookshelfController.removeBookshelf);

module.exports = router;
