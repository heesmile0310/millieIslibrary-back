const dataSource = require('.');

const createBook = async ({
  title,
  coverImg,
  toc,
  introduction,
  categoryId,
  publishTime,
  publisher,
  ratingScore,
  page,
}) => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        books
          (
            title,
            cover_img,
            toc,
            introduction,
            categories_id,
            publish_time,
            publisher,
            rating_score,
            page
          )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      coverImg,
      toc,
      introduction,
      categoryId,
      publishTime,
      publisher,
      ratingScore,
      page,
    ]
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
