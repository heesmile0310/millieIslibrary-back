const bookDao = require('../models/book.dao');
const categoryDao = require('../models/category.dao');
const authorDao = require('../models/author.dao');

const createBook = async book => {
  const { title, coverImg, toc, introduction, category, author } = book;

  // Find category Entity
  let { id: categoryId } = await categoryDao.findCategoryByCateName(category).then(v => {
    return { ...v };
  });

  if (!categoryId) {
    // Create category Entity
    categoryId = (await categoryDao.createCategory(category)).insertId;
  }

  // Create book Entity
  const { insertId: bookId } = await bookDao.createBook(
    title,
    coverImg,
    toc,
    introduction,
    categoryId
  );

  // Find author Entity
  let { id: authorId } = await authorDao.findAuthorByAuthorName(author).then(v => {
    return { ...v };
  });

  if (!authorId) {
    // Create author Entity
    authorId = (await authorDao.createAuthor(author, 'authorIntro')).insertId;
  }

  // Create author Entity
  await bookDao.createBookAuthor(bookId, authorId);
};

module.exports = { createBook };
