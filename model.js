const userId = req.query.userId;
User.sequelize.query(`SELECT * FROM users WHERE id = ${userId}`);
