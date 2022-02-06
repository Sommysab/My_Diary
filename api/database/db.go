package database

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// Connect to the DATABASE
func Connect() (*gorm.DB, error) {
	// db, err := gorm.Open(config.DBDRIVER, config.DBURL)
	db, err := gorm.Open("mysql", "docker:passwor1d@tcp(db)/godocker")
	if err != nil {
		return nil, err
	}
	return db, nil
}
