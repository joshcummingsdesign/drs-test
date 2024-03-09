const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

async function findUserByUsername(username) {
  const query = `SELECT * FROM Users WHERE username = '${username}'`;
  const user = await sequelize.query(query, { model: User });
  return user;
}

