const dataSource = require('../models/index');

// 리뷰 등록
const createReview = async (user_id, books_id, content) => {
  await dataSource.query(
    `
    INSERT reviews
    SET users_id=${user_id}, books_id=${books_id}, content='${content}'
    `
  );
  const result = await dataSource.query(
    `
    SELECT
        r.id,
        r.users_id,
        b.id AS books_id,
        b.title,
        u.nickname,
        r.content,
        SUBSTRING(r.created_at,1,10) AS created_at,
        SUBSTRING(r.updated_at,1,10) AS updated_at
    FROM reviews AS r
    LEFT JOIN books AS b ON b.id = r.users_id
    LEFT JOIN users AS u ON u.id = r.users_id
    WHERE r.users_id = ${user_id} AND B.id = ${books_id}
    ORDER BY r.id DESC
    LIMIT 1
    `
  );
  return result;
};

// 리뷰 수정
const updateReview = async (review_id, user_id, content) => {
  let checkReview = await dataSource.query(
    `
    SELECT * FROM reviews WHERE id='${review_id}'
    `
  );
  //리뷰가 없을 경우
  if (checkReview.length === 0) {
    let result = 'REVIEW IS NOT EXIST';
    return result;
  } else if (
    // 덧글 작성자가 아닐때,
    String(checkReview[0].users_id) !== user_id
  ) {
    let result = 'ONLY WRITER CAN MODIFY COMMENT';
    return result;
  } else {
    // 리뷰 수정
    await dataSource.query(
      `
      UPDATE reviews SET content='${content}' WHERE id=${review_id}
      `
    );
    const result = await dataSource.query(
      `
      SELECT * FROM reviews WHERE id = ${review_id}
      ORDER BY created_at ASC;
      `
    );
    return result;
  }
};

// 리뷰 삭제
const deleteReview = async (review_id, user_id) => {
  const checkReview = await dataSource.query(
    `
    SELECT * FROM reviews WHERE id=${review_id}
    `
  );
  //리뷰가 존재하지 않을 경우
  if (checkReview.length === 0) {
    return 'REVIEW IS NOT EXIST';
  } else if (
    //로그인한 사용자와 댓글 작성자가 다를 경우 에러 발생
    String(checkReview[0].users_id) !== user_id
  ) {
    return 'ONLY WRITER CAN DELETE COMMENT';
  } else if (String(checkReview[0].users_id) === user_id) {
    await myDataSource.query(
      `
      DELETE FROM reviews WHERE id=${review_id}
      `
    );
    return 'REVIEW DELETED';
  }
};

module.exports = { createReview, updateReview, deleteReview };
