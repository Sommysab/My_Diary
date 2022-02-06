package database

import (
	"backend/config"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// Connect to the DATABASE
func Connect() (*gorm.DB, error) {
	// db, err := gorm.Open("mysql", "docker:1_paWsword@tcp(godockerDB)/godocker")
	db, err := gorm.Open(config.DBDRIVER, config.DBURL)
	if err != nil {
		return nil, err
	}
	return db, nil
}
