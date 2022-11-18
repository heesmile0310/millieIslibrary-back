const bookDetailDao = require('../models/book-detail.dao');

// 북 상세 페이지
const findDetailByBookId = async id => {
  try {
    return await bookDetailDao.findDetailByBookId(id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 찜하기 체크
const checkFavoriteAndBookshelf = async (id, user_id) => {
  try {
    return await bookDetailDao.checkFavoriteAndBookshelf(id, user_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
