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
    SELECT * FROM
      users 
    WHERE
      email ="${email}"`);

  return userInfo;
};

const changeUserInfo = async (hashedPw, nickname, user_id) => {
  await myDataSource.query(`
  UPDATE 
    users 
  SET
    password = "${hashedPw}",
    nickname = "${nickname}"
  WHERE 
    id = ${user_id}
`);
};

const withdrawUser = async user_id => {
  await myDataSource.query(`
    DELETE FROM users
    WHERE id = ${user_id}
  `);
};

module.exports = { signUp, login, changeUserInfo, withdrawUser };
