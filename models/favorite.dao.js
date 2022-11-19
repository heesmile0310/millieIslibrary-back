const dataSource = require('.');

// 찜하기 추가
const addFavorite = async (user_id, books_id) => {
  const checkFavorite = await dataSource.query(
    `
    SELECT
    EXISTS (
    SELECT
      id
    FROM
      favorites
    WHERE
      books_id = '${books_id}'
      AND users_id = '${user_id}') AS check_favorite
    `
  );

  const checkValue = Number(checkFavorite[0].check_favorite);
  if (checkValue === 0) {
    await dataSource.query(
      `
      INSERT
        favorites
      SET
        users_id = ${user_id},
        books_id = ${books_id}
      `
    );
    return await dataSource.query(
      `
      SELECT
          f.id,
          f.users_id,
          b.id AS books_id,
          b.title,
          u.nickname
      FROM 
        favorites AS f
      LEFT JOIN 
        books AS b 
      ON 
        b.id = f.books_id
      LEFT JOIN 
        users AS u 
      ON u.id = f.users_id
      WHERE 
        f.users_id = ${user_id} AND f.books_id = ${books_id}
  
      `
    );
  } else if (checkValue === 1) {
    return `ALREADY FAVORITE ADDED`;
  }
};

// 찜하기 취소
const removeFavorite = async (user_id, books_id) => {
  const checkFavorite = await dataSource.query(
    `
    SELECT
      *
    FROM
      favorites
    WHERE
      users_id = ${user_id}
      AND books_id = ${books_id}
    `
  );
  // 찜하기가 존재하지 않을 경우
  if (checkFavorite.length === 0) {
    return 'FAVORITE IS NOT EXIST';
  } else if (
    //로그인한 사용자와 찜하기 작성자가 다를 경우 에러 발생
    checkFavorite[0].users_id !== user_id
  ) {
    return 'ONLY OWNER CAN DELETE';
  } else if (checkFavorite[0].users_id === user_id) {
    await dataSource.query(
      `
      DELETE
      FROM
        favorites
      WHERE 
        users_id = ${user_id}
        AND books_id = ${books_id}
      `
    );
    return 'FAVORITE IS REMOVED';
  }
};

module.exports = { addFavorite, removeFavorite };
