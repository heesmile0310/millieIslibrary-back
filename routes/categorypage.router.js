const express = require('express');
const router = express.Router();

const {
  findCategoryAll,
  searchList,
  findBooksByCateId,
  findAuthorRandom,
  findBooksRandom,
} = require('../controllers/categorypage.controller');

router.get('/info', findCategoryAll);
router.get('/bookrandom', findBooksRandom);
router.get('/authorrandom', findAuthorRandom);
router.post('/search', searchList);
router.get('/:categoryId', findBooksByCateId);

module.exports = router;
