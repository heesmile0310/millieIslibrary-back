const myDataSource = require('../models/index');

const sendMailForgotPassword = async () => {
  const [userInfo] = await myDataSource.query(
    `
    SELECT * FROM
      users 
    WHERE
      email = ?
    `,
    [email]
  );

  return userInfo;
};

module.exports = { sendMailForgotPassword };
