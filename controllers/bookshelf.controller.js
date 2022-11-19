const bookshelfService = require('../services/bookshelf.service');
const myUtil = require('../utils/myutil');

const addBookshelf = async (req, res) => {
  try {
    const user_id = req.userInfo.id;
    const { books_id } = req.body;
    myUtil.checkDataIsNotEmpty({
      books_id,
    });
    const result = await bookshelfService.addBookshelf(user_id, books_id);
    res.status(200).json({
      result,
    });
    console.log('ADD BOOKSHELF');
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeBookshelf = async (req, res) => {
  try {
    const user_id = req.userInfo.id;
    const { books_id } = req.body;
    myUtil.checkDataIsNotEmpty({
      books_id,
    });
    const result = await bookshelfService.removeBookshelf(user_id, books_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addBookshelf, removeBookshelf };
