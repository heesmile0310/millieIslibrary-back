const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review.controllers');

router.post('', reviewController.createReview);
router.patch('', reviewController.updateReview);
router.delete('', reviewController.deleteReview);

module.exports = router;
