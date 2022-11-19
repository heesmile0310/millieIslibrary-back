const addListDao = require('../models/addList.dao');

const addBookshelf = async (user_id, books_id) => {
  try {
    return await addListDao.addBookshelf(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeBookshelf = async (user_id, books_id) => {
  try {
    return await addListDao.removeBookshelf(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const addFavorite = async (user_id, books_id) => {
  try {
    return await addListDao.addFavorite(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeFavorite = async (user_id, books_id) => {
  try {
    return await addListDao.removeFavorite(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addBookshelf, removeBookshelf, addFavorite, removeFavorite };
