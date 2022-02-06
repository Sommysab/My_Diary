package database

import (
	"backend/config"
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Connect to the DATABASE
func Connect() (*gorm.DB, error) {
	fmt.Println(config.DBDRIVER)
	fmt.Println(config.DBURL)
	db, err := gorm.Open("postgres", "host=blog port=5432 user=postgres dbname=postgres sslmode=disable password=postgres")
	// db, err := gorm.Open(config.DBDRIVER, config.DBURL)
	if err != nil {
		return nil, err
	}
	return db, nil
}
