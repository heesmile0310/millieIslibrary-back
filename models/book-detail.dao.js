const myDataSource = require('../models/index');

const findDetailByBookId = async id => {
  let result = await myDataSource.query(
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
                "author_name", a.author_name 
                )
        	) AS books_authors,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                "reviews_id", r.id,
                "reviews_user_id", r.users_id,
                "reviews_user_name", u.nickname,
                "reviews_book_id", r.books_id,
                "reviews_content", r.content 
                )
            ) AS reviews
        FROM books AS b 
        JOIN categories AS c ON b.categories_id = c.id 
        RIGHT JOIN books_authors AS ba ON b.id = ba.books_id 
        JOIN authors AS a ON a.id = ba.authors_id 
        RIGHT JOIN reviews AS r ON r.books_id = b.id 
        JOIN users AS u on u.id = r.users_id 
        WHERE b.id = ${id}
        GROUP BY b.id 
        `
  );
  result = [...result].map(item => {
    return {
      ...item,
      books_authors: JSON.parse(item.books_authors),
      reviews: JSON.parse(item.reviews),
    };
  });
  return result;
};

module.exports = { findDetailByBookId };
