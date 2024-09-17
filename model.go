var users []User
err = db.Raw("SELECT * FROM users WHERE name = '" + userName + "'").Scan(&users).Error
if err != nil {
  log.Fatal(err)
}
