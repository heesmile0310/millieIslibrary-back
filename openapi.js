const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;

// const createData = async () => {
//   try {
//     const result = await axios({
//       method: 'get',
//       url: `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101`,
//     }).then(res => {
//       res.data.item.forEach(element => {
//         // console.log(element);
//         let books = new Object();
//         books.title = element.title;
//         books.author = element.author.split(' ')[0];
//         books.category = element.categoryName.split('>')[1];
//         books.cover_img = element.cover;
//         books.introduction = element.description;
//       });
//       return books;
//     });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

const createData1 = async () => {
  try {
    const result = await axios
      .get(
        `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101`
      )
      .then(res => {
        res.data.item.forEach(element => {
          // console.log(element);
          let books = new Object();
          books.title = element.title;
          books.author = element.author.split(' ')[0];
          books.category = element.categoryName.split('>')[1];
          books.cover_img = element.cover;
          books.introduction = element.description;
          // console.log(books);
        });
      });
  } catch (err) {
    console.log(err);
  }
};
