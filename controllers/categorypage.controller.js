const categorypageService = require('../services/categorypage.service');

const findCategoryAll = async (req, res) => {
  try {
    let result = await categorypageService.findCategoryAll();
    res.status(200).json({ message: 'success', result });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { findCategoryAll };
