const userName = req.query.userName;
User.findAll({
  where: {
    "$userName = userName$": userName
  }
});
