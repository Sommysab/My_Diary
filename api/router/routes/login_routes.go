package routes

import (
	"net/http"

	"backend/api/controllers"
)

var loginRoutes = []Route{
	Route{
		URI:          "/api/login",
		Method:       http.MethodPost,
		Handler:      controllers.Login,
		AuthRequired: false,
	},
}
