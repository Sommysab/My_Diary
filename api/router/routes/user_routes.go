package routes

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello!\\nYour HTTP request method is %s\\n", r.Method)
	w.WriteHeader(http.StatusAccepted)
}

var usersRoutes = []Route{
	Route{
		URI:          "/api",
		Method:       http.MethodGet,
		Handler:      helloHandler,
		AuthRequired: false,
	},
	// Route{
	// 	URI:          "/api/users",
	// 	Method:       http.MethodGet,
	// 	Handler:      controllers.GetUsers,
	// 	AuthRequired: false,
	// },
	// Route{
	// 	URI:          "/api/users/{id}",
	// 	Method:       http.MethodGet,
	// 	Handler:      controllers.GetUser,
	// 	AuthRequired: false,
	// },
	// Route{
	// 	URI:          "/api/users/{id}",
	// 	Method:       http.MethodPut,
	// 	Handler:      controllers.UpdateUser,
	// 	AuthRequired: true,
	// },
	// Route{
	// 	URI:          "/api/users/{id}",
	// 	Method:       http.MethodDelete,
	// 	Handler:      controllers.DeleteUser,
	// 	AuthRequired: true,
	// },
}
