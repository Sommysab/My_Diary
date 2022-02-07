package routes

import (
	"net/http"

	"backend/api/controllers"
)

var registerRoutes = []Route{
	Route{
		URI:          "/register",
		Method:       http.MethodPost,
		Handler:      controllers.Register,
		AuthRequired: false,
	},
}
