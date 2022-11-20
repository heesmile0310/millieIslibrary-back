const myDataSource = require('../models/index');

const findCategoryAll = async () => {
  const result = await myDataSource.query(`
    SELECT
      id, content
    FROM
      categories
  `);
  return result;
};

const searchList = async text => {
  const result = await myDataSource.query(`
    SELECT
      title
    FROM
      books
    WHERE
      title
    LIKE "%${text}%"
  `);
  return result;
};

const findBooksByCateId = async category_id => {
  let listInfo = await myDataSource.query(`
    SELECT categories.content,
      JSON_ARRAYAGG(
      JSON_OBJECT(
      "title", books.title,
      "cover_img", books.cover_img,
      "author_name", authors.author_name))as books
    FROM categories
    JOIN books ON books.categories_id = categories.id
    JOIN books_authors ON books_authors.books_id = books.id
    JOIN authors ON authors.id = books_authors.authors_id
    WHERE categories.id = ${category_id}
    GROUP BY categories.id
  `);

  listInfo = [...listInfo].map(item => {
    return { ...item, books: JSON.parse(item.books) };
  });
  return listInfo;
};

module.exports = { findCategoryAll, searchList, findBooksByCateId };
