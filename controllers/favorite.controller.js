const favoriteService = require('../services/favorite.service');
const myUtil = require('../utils/myutil');

const addFavorite = async (req, res) => {
  try {
    const user_id = req.userInfo.id;
    const { books_id } = req.body;
    myUtil.checkDataIsNotEmpty({
      books_id,
    });
    const result = await favoriteService.addFavorite(user_id, books_id);
    res.status(200).json({
      result,
    });
    console.log('ADD FAVORITE');
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const user_id = req.userInfo.id;
    const { books_id } = req.body;
    myUtil.checkDataIsNotEmpty({
      books_id,
    });
    const result = await favoriteService.removeFavorite(user_id, books_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addFavorite, removeFavorite };
