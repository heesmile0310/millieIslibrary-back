const bookshelfService = require('../services/bookshelf.service');

const addBookshelf = async (req, res) => {
  try {
    const { user_id, books_id } = req.body;
    // id = 게시물의 id
    if (!user_id) {
      const error = new Error('LOGIN NEEDED');
      error.statusCode = 404;
      throw error;
    }
    // book id가 없을 경우 에러 발생
    if (!books_id) {
      const error = new Error('VALID BOOKS_ID NEEDED');
      error.statusCode = 404;
      throw error;
    }
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
    const { user_id, books_id } = req.body;
    const result = await bookshelfService.removeBookshelf(user_id, books_id);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addBookshelf, removeBookshelf };
