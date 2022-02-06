package database

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// Connect to the DATABASE
func Connect() (*gorm.DB, error) {
	// db, err := gorm.Open("postgres", "host=blog port=5432 user=postgres dbname=postgres sslmode=disable password=postgres")
	db, err := gorm.Open("mysql", "docker:password@tcp(godockerDB)/godocker") // gorm.Open(config.DBDRIVER, config.DBURL)
	if err != nil {
		return nil, err
	}
	return db, nil
}
