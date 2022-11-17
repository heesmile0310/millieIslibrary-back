const bookDetailService = require('../services/book-detail.service');

const findDetailByBookId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookDetailService.findDetailByBookId(id);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { findDetailByBookId };
