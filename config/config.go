package config

import (
	"fmt"
	"os"
	"strconv"
	// "github.com/joho/godotenv"
)

// PORT server port
var (
	PORT      = 0
	SECRETKEY []byte
	DBDRIVER  = ""
	DBURL     = ""
	ENV       = ""
)

// Load the server PORT
func Load() {
	var err error
	// err = godotenv.Load()
	// if err != nil {
	// 	log.Fatal(err)
	// }

	PORT, err = strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		PORT = 9000
	}
	DBDRIVER = os.Getenv("DB_DRIVER")
	DBURL = fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_NAME"),
	)

	SECRETKEY = []byte(os.Getenv("API_SECRET"))

	ENV = os.Getenv("ENV")
}
