const reviewDao = require('../models/review.dao');

const createReview = async (user_id, books_id, content) => {
  try {
    const result = await reviewDao.createReview(user_id, books_id, content);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const updateReview = async (review_id, user_id, content) => {
  try {
    const result = await reviewDao.updateReview(review_id, user_id, content);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const deleteReview = async (review_id, user_id) => {
  try {
    await reviewDao.deleteReview(review_id, user_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { createReview, updateReview, deleteReview };
