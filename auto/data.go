package auto

import (
	"backend/api/models"
)

var users = []models.User{
	models.User{Name: "sommysab", Email: "sommysab@gmail.com", Password: "1"},
}

var posts = []models.Post{
	models.Post{
		Title:   "Title",
		Content: "Hello World",
	},
}
