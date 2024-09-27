func save() {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	var product Product
	userInput := "'; DROP TABLE products; --"
	db.Where("code = '" + userInput + "'").First(&product)
}
