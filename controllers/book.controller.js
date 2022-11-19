const bookServ = require('../services/book.service');
const myUtil = require('../utils/myutil.js');

async function createBook(req, res) {
  const book = ({
    title,
    author,
    authorIntro,
    category,
    coverImg,
    introduction,
    toc,
    publishTime,
    publisher,
    ratingScore,
    page,
  } = req.body);
  myUtil.checkDataIsNotEmpty(book);
  await bookServ.createBook(book);
  res.json('생성 완료');
}

module.exports = { createBook };
