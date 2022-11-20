const bookDetailDao = require('../models/book-detail.dao');

// 북 상세 페이지
const findDetailByBookId = async id => {
  return await bookDetailDao.findDetailByBookId(id);
};

// 찜하기 체크
const checkFavoriteAndBookshelf = async (id, user_id) => {
  let check = await bookDetailDao.checkFavoriteAndBookshelf(id, user_id);

  // mySQL에서는 boolean 값을 0,1로만 표현하기에 string으로 처리하였는데,
  // service단에서 이를 다시 boolean 타입으로 재처리하는 과정 추가
  const convertFavoriteToBoolean =
    check[0].check_favorite === 'TRUE' ? true : false;
  const convertBookshelfBoolean =
    check[0].check_bookshelf === 'TRUE' ? true : false;

  check = [...check].map(() => {
    return {
      check_favorite: convertFavoriteToBoolean,
      check_bookshelf: convertBookshelfBoolean,
    };
  });
  return check;
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
