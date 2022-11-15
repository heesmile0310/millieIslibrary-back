const myDataSource = require('../models/index');

const signUp = async (email, hashedPw, nickname) => {
  await myDataSource.query(`
    INSERT INTO 
        users ( email, nickname, password)
    VALUES
        ("${email}", "${nickname}", "${hashedPw}")
  `);
};

const login = async email => {
  const [userInfo] = await myDataSource.query(`
    SELECT * FROM users 
    WHERE email ="${email}"`);

  return userInfo;
};

const changeUserInfo = async (password, nickname, user_id) => {
  await myDataSource.query(`
  UPDATE 
    postings 
  SET
    password = "${password}",
    nickname = "${nickname}"
  WHERE 
    user_id = ${user_id}
`);
};

const withdrawUser = async user_id => {
  await myDataSource.query(`
    DELETE FROM users
    WHERE user_id = ${user_id}
  `);
};

module.exports = { signUp, login, changeUserInfo, withdrawUser };
