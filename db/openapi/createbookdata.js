const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const booksNum = 5;

// npm run db 명령어 사용시 books data 생성

const createBookData = async () => {
  try {
    const result = await axios
      .get(
        `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=${booksNum}&start=1&SearchTarget=Book&output=js&Version=20131101`
      )
      .then(res => {
        return res.data.item.map(element => {
          // console.log(element);
          let book = new Object();
          book.title = element.title;
          book.author = element.author.split(' ')[0];
          book.category = element.categoryName.split('>')[1];
          book.cover_img = element.cover;
          book.introduction = element.description;
          return book;
        });
      });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createBookData();

// 데이터 받아오는지 확인용
(async () => {
  console.log('before start');

  const result = await createBookData();

  console.log(result);
})();
