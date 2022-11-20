const bookDetailService = require('../services/book-detail.service');

const findDetailByBookId = async (req, res) => {
  try {
    const result = await bookDetailService.findDetailByBookId(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const checkFavoriteAndBookshelf = async (req, res) => {
  try {
    const user_id = req.userInfo.id;
    const result = await bookDetailService.checkFavoriteAndBookshelf(
      req.params.id,
      user_id
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
