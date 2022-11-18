const favoriteDao = require('../models/favorite.dao');

const addFavorite = async (user_id, books_id) => {
  try {
    return await favoriteDao.addFavorite(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeFavorite = async (user_id, books_id) => {
  try {
    return await favoriteDao.removeFavorite(user_id, books_id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addFavorite, removeFavorite };
