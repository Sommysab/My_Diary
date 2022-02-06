package database

import (
	"backend/config"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// Connect to the DATABASE
func Connect() (*gorm.DB, error) {
	fmt.Println(config.DBURL)
	fmt.Println(config.DBDRIVER)
	db, err := gorm.Open(config.DBDRIVER, config.DBURL)
	// db, err := gorm.Open("mysql", "docker:passwor1d@tcp(godockerDB)/godocker?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		return nil, err
	}
	return db, nil
}
