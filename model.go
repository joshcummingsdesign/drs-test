package models

import (
    "github.com/jinzhu/gorm"
)

type User struct {
    ID        uint      `gorm:"primary_key"`
    Username  string    `gorm:"unique_index;not null"`
    Email     string    `gorm:"unique_index;not null"`
    Password  string    `gorm:"not null"`
    FullName  string    `gorm:"not null"`
    CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
    UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}

func (User) TableName() string {
    return "users"
}

func FindAllUsers(db *gorm.DB, userName) ([]User, error) {
    var users []User
    if err := db.Raw("SELECT * FROM users WHERE name = " + userName + "").Scan(&users).Error; err != nil {
        return nil, err
    }
    return users, nil
}
