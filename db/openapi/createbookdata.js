var fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const ORIGIN_URL = process.env.ORIGIN_URL;
const booksNum = 50;
const pages = [1];

console.log("API_KEY: ", API_KEY);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getbookListUrl(pageNumber) {
  return `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewSpecial&MaxResults=${booksNum}&start=${pageNumber}&SearchTarget=Book&output=js&Version=20131101`;
}

function getBookDetail(isbn13) {
  return `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=ISBN13&ItemId=${isbn13}&output=js&Version=20131101&OptResult=ebookList,usedList,Toc,ratingInfo`;
}

function convertFormat(aladinItem) {
  let convertedItem = {
    title: aladinItem.title,
    author: aladinItem.author.split(' ')[0],
    category: aladinItem.categoryName.split('>')[1],
    coverImg: aladinItem.cover,
    introduction: aladinItem.description || '소개 없음',
    toc: aladinItem.toc || '목차 없음',
    publishTime: aladinItem.pubDate,
    publisher: aladinItem.publisher,
    ratingScore: getRandomInt(100) * 0.1,
    page: aladinItem.subInfo.itemPage || 0,
  };
  return convertedItem;
}
// npm run db 명령어 사용시 books data 생성

const createBookData = async () => {
  pages.forEach(async pageNumber => {
    const requestURI = getbookListUrl(pageNumber);
    console.log(requestURI);
    const promiseResult = await axios.get(requestURI).then(async res => {
      const promiseResult = await Promise.allSettled(
        res.data.item.map(async element => {
          const detailBook = await axios
            .get(getBookDetail(element.isbn13))
            .then(v => {
              return { ...v.data, ...v.data.item[0], item: undefined };
            });
          return convertFormat(detailBook);
        })
      );
      return promiseResult;
    });

    const books = promiseResult.map(v => {
      return v.value;
    });

    console.log("book: ", books);
    // fs.writeFile(`./db/openapi/aladindb/test${pages[0]}.json`, JSON.stringify(books), function(err) {
    //   if (err) {
    //       console.log(err);
    //   }
    // });

    await books.forEach(async (book, idx) => {
      await axios
        .post(ORIGIN_URL + '/books', book)
        .then(v => {
          console.log(`worked ${idx} `);
        })
        .catch(e => {
          console.log(`something wrong ${idx} `);
        });
    });
    console.log(books.length);
  });
};

(async () => {
  await createBookData();
})();
