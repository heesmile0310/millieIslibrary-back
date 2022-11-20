const categorypageService = require('../services/categorypage.service');

const findCategoryAll = async (req, res) => {
  try {
    let data = await categorypageService.findCategoryAll();
    res.status(200).json({ message: 'success', data });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};

const searchList = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const data = await categorypageService.searchList(text);
    res.status(200).json({ message: 'success', data });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};

const findBooksByCateId = async (req, res) => {
  try {
    const category_id = req.params.categoryId;
    const data = await categorypageService.findBooksByCateId(category_id);
    res.status(200).json({ message: 'success', data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { findCategoryAll, searchList, findBooksByCateId };
