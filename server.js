const unsafeData = req.query.unsafeData;
User.findAll({
  where: Sequelize.literal(`column = ${unsafeData}`)
});
