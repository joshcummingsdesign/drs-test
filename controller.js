const username = req.body.username;

sequelize.query(`SELECT * FROM Users WHERE username = '${username}'`)
  .then(users => {
    console.log(users);
  })
  .catch(err => {
    console.error('Error:', err);
  });
