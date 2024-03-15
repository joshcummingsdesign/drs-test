package main

import (
    "fmt"
    "log"

    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type User struct {
    ID       uint
    Username string
    Password string
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/database?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Error connecting to database: %v", err)
    }
    defer db.Close()

    var username string
    fmt.Print("Enter username: ")
    fmt.Scanln(&username)

    var users []User
    db.Raw("SELECT * FROM users WHERE username = '" + username + "'").Scan(&users)

    fmt.Println("Users found:")
    for _, user := range users {
        fmt.Printf("ID: %d, Username: %s, Password: %s\n", user.ID, user.Username, user.Password)
    }
}
