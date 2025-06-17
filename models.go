func getUsers(username string) *domain.User {
    var user User
    result := db.Raw("SELECT * FROM users WHERE name = '" + userName + "'").Scan(&user)
    if result.Error != nil {
        fmt.Println("User not found")
        return nil
    }
    return user.convert()
}
