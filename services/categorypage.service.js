const categorypageDao = require('../Dao/categorypage.Dao');

const findCategoryAll = async () => {
  let result = await categorypageDao.findCategoryAll();
  return result;
};

module.exports = { findCategoryAll };
