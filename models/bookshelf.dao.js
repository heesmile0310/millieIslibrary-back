const dataSource = require('.');

// 찜하기 추가
const addBookshelf = async (user_id, books_id) => {
  const checkBookshelf = await dataSource.query(
    `
    SELECT
    EXISTS (
    SELECT
      id
    FROM
      bookshelves
    WHERE
      books_id = '${books_id}'
      AND users_id = '${user_id}') AS check_bookshelf
    `
  );

  const checkValue = Number(checkBookshelf[0].check_bookshelf);
  if (checkValue === 0) {
    await dataSource.query(
      `
      INSERT
        bookshelves
      SET
        users_id = ${user_id},
        books_id = ${books_id}
      `
    );
    return await dataSource.query(
      `
      SELECT
          bs.id,
          bs.users_id,
          b.id AS books_id,
          b.title,
          u.nickname
      FROM 
        bookshelves AS bs
      LEFT JOIN 
        books AS b 
      ON 
        b.id = bs.books_id
      LEFT JOIN 
        users AS u 
      ON u.id = bs.users_id
      WHERE 
        bs.users_id = ${user_id} AND bs.books_id = ${books_id}
  
      `
    );
  } else if (checkValue === 1) {
    return `ALREADY BOOKSHELF ADDED`;
  }
};

// 찜하기 취소
const removeBookshelf = async (user_id, books_id) => {
  const checkBookshelf = await dataSource.query(
    `
    SELECT
      *
    FROM
      bookshelves
    WHERE
      users_id = ${user_id}
      AND books_id = ${books_id}
    `
  );
  // 찜하기가 존재하지 않을 경우
  if (checkBookshelf.length === 0) {
    return 'BOOKSHELF IS NOT EXIST';
  } else if (
    //로그인한 사용자와 찜하기 작성자가 다를 경우 에러 발생
    checkBookshelf[0].users_id !== user_id
  ) {
    return 'ONLY OWNER CAN DELETE';
  } else if (checkBookshelf[0].users_id === user_id) {
    await dataSource.query(
      `
      DELETE
      FROM
        bookshelves
      WHERE 
        users_id = ${user_id}
        AND books_id = ${books_id}
      `
    );
    return 'BOOKSHELF IS REMOVED';
  }
};

module.exports = { addBookshelf, removeBookshelf };
