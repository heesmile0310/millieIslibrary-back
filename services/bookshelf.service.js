const bookshelfDao = require('../models/bookshelf.dao');

const addBookshelf = async (user_id, books_id) => {
  try {
    return await bookshelfDao.addBookshelf(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeBookshelf = async (user_id, books_id) => {
  try {
    return await bookshelfDao.removeBookshelf(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addBookshelf, removeBookshelf };
