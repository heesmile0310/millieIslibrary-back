const express = require('express');
const router = express.Router();

const {
  findCategoryAll,
  searchList,
  findBooksByCateId,
} = require('../controllers/categorypage.controller');

router.get('/info', findCategoryAll);
router.post('/search', searchList);
router.get('/:categoryId', findBooksByCateId);

module.exports = router;
