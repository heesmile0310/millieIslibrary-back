const dataSource = require('.');

const createBook = async (title, coverImg, toc, introduction, categoryId) => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        books
          (
            title,
            cover_img,
            table_of_contents,
            introduction,
            categories_id
          )
      VALUES
      (?, ?, ?, ?, ?)

    `,
    [title, coverImg, toc, introduction, categoryId]
  );

  return insertStatus;
};

const createBookAuthor = async (booksId, authorsId) => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        books_authors
          (
            books_id,
            authors_id
          )
      VALUES
      (?, ?)
    `,
    [booksId, authorsId]
  );

  return insertStatus;
};

module.exports = { createBook, createBookAuthor,};
