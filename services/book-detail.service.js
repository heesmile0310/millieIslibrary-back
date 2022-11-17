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

module.exports = { findDetailByBookId };
