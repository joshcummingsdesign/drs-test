const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  age: Sequelize.INTEGER
});

async function findUserByUsername(username) {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    return user;
  } catch (error) {
    console.error('Error occurred while finding user:', error);
    throw error;
  }
}

findUserByUsername('john_doe')
  .then(user => {
    if (user) {
      console.log('User found:', user.toJSON());
    } else {
      console.log('User not found');
    }
  })
  .catch(err => console.error(err));
