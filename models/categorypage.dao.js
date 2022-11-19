const myDataSource = require('../models/index');

const findCategoryAll = async (req, res) => {
  `
    SELECT
      content
    FROM
      categories
  `;
};

module.exports = { findCategoryAll };
