package database

import (
	"backend/config"

	"github.com/jinzhu/gorm"
	_ "gorm.io/driver/postgres"
)

// Connect to the DATABASE
func Connect() (*gorm.DB, error) {
	db, err := gorm.Open(config.DBDRIVER, config.DBURL)
	if err != nil {
		return nil, err
	}
	return db, nil
}
