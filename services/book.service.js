const bookDao = require('../models/book.dao');
const categoryDao = require('../models/category.dao');
const authorDao = require('../models/author.dao');
const Mutex = require('async-mutex').Mutex;
const mutex1 = new Mutex();
const mutex2 = new Mutex();


const createBook = async book => {
  const {
    title,
    author,
    category,
    coverImg,
    introduction,
    toc,
    publishTime,
    publisher,
    ratingScore,
    page,
  } = book;

  let categoryId;
  await mutex1.runExclusive(async () => {
    // Find category Entity
    categoryId = await categoryDao.findCategoryByCateName(category).then(v => {
      return { ...v }.id;
    });

    if (!categoryId) {
      // Create category Entity
      categoryId = (await categoryDao.createCategory(category)).insertId;
    }
  })

  // Create book Entity
  const { insertId: bookId } = await bookDao.createBook({
    title,
    coverImg,
    toc,
    introduction,
    categoryId,
    publishTime,
    publisher,
    ratingScore,
    page,
  });

  let authorId;
  await mutex2.runExclusive(async () => {
    // Find author Entity
    authorId = await authorDao.findAuthorByAuthorName(author).then(v => {
      return { ...v }.id;
    });

    if (!authorId) {
      // Create author Entity
      authorId = (await authorDao.createAuthor(author, 'authorIntro')).insertId;
    }
  });

  // Create author Entity
  await bookDao.createBookAuthor(bookId, authorId);
};

module.exports = { createBook };
