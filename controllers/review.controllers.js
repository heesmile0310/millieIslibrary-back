const reviewService = require('../services/review.services');

const createReview = async (req, res) => {
  try {
    // user_id = req.user_id;  // validateToken 완성되면 user_id = 작성자의 id
    const { user_id, books_id, content } = req.body;
    // id = 게시물의 id
    if (!content) {
      //리뷰 내용이 없을 경우 에러 발생
      const error = new Error('REVIEW TEXT NEEDED');
      error.statusCode = 404;
      throw error;
    }
    // book id가 없을 경우 에러 발생
    if (!books_id) {
      const error = new Error('VALID BOOKS_ID NEEDED');
      error.statusCode = 404;
      throw error;
    }
    const result = await reviewService.createReview(user_id, books_id, content);
    res.status(200).json({
      result,
    });
    console.log('COMMENT POSTED');
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    // user_id = req.user_id; // validateToken용 user_id = 작성자의 id
    const { review_id, user_id, content } = req.body;
    const result = await reviewService.updateReview(
      review_id,
      user_id,
      content
    );
    res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    // user_id = req.user_id; // validateToken용 user_id = 작성자의 id
    const { review_id, user_id } = req.body;
    const result = await reviewService.deleteReview(review_id, user_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { createReview, updateReview, deleteReview };
