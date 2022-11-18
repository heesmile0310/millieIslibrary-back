const dataSource = require('.');

const findDetailByBookId = async id => {
  let bookResult = await dataSource.query(
    `
    SELECT 
      b.id, 
      b.title, 
      b.cover_img, 
      b.toc, 
      b.introduction, 
      b.categories_id, 
      c.content AS categories_name,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        "author_id", ba.authors_id,
        "author_name", SUBSTRING_INDEX(a.author_name, " ", 1)
        )
      ) AS books_authors	
    FROM books b
    LEFT JOIN categories AS c 
      ON b.categories_id = c.id
    LEFT JOIN books_authors AS ba 
      ON b.id = ba.books_id
    LEFT JOIN authors AS a 
      ON a.id = ba.authors_id
    WHERE b.id = ${id}
    `
  );
  bookResult = [...bookResult].map(item => {
    return {
      ...item,
      books_authors: JSON.parse(item.books_authors),
    };
  });

  let reviewResult = await dataSource.query(
    `
    WITH tables AS (
      SELECT
          b.id AS books_id,
          COUNT(r.id) AS reviews_cnt
      FROM
          books b
      RIGHT JOIN reviews r ON
          b.id = r.books_id
      WHERE
        b.id = ${id} 
          )
      SELECT 
        IFNULL(a.reviews_cnt, "0") AS reviews_cnt,
          CONCAT(
          	"[",
            GROUP_CONCAT(
              JSON_OBJECT(
              "reviews_id", r.id,
              "reviews_user_id", r.users_id,
              "reviews_user_name", u.nickname,
              "reviews_content", r.content,
              "reviews_created_time", SUBSTRING(r.created_at, 1, 16),
              "reviews_updated_time", SUBSTRING(r.updated_at, 1, 16)
              ) ORDER BY r.created_at ASC
            ),
            "]"
          ) AS reviewsInfo
      FROM
          books b
      RIGHT JOIN reviews r 
          ON
        b.id = r.books_id
      JOIN users u 
          ON
        r.users_id = u.id
      JOIN tables a 
          ON
        a.books_id = b.id
      WHERE
        b.id = ${id}
    `
  );
  reviewResult = [...reviewResult].map(item => {
    return {
      ...item,
      reviewsInfo: JSON.parse(item.reviewsInfo),
    };
  });

  return { bookResult, reviewResult };
};

// 찜하기, 담기 체크
const checkFavoriteAndBookshelf = async (id, user_id) => {
  return await dataSource.query(
    `
    SELECT
    EXISTS (
      SELECT
        id
      FROM
        favorites
      WHERE
        books_id = '${id}'
        AND users_id = '${user_id}') AS check_favorite,
    EXISTS (
      SELECT
        id
      FROM
        bookshelves
      WHERE
        books_id = '${id}'
        AND users_id = '${user_id}') AS check_bookshef
    `
  );
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
