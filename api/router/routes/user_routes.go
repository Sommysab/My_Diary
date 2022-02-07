package routes

import (
	"backend/api/controllers"
	"net/http"
)

// func helloHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Hello!\\nYour HTTP request method is %s\\n", r.Method)
// 	w.WriteHeader(http.StatusAccepted)
// }

var usersRoutes = []Route{
	// Route{
	// 	URI:          "/",
	// 	Method:       http.MethodGet,
	// 	Handler:      helloHandler,
	// 	AuthRequired: false,
	// },
	Route{
		URI:          "/users",
		Method:       http.MethodGet,
		Handler:      controllers.GetUsers,
		AuthRequired: false,
	},
	Route{
		URI:          "/users/{id}",
		Method:       http.MethodGet,
		Handler:      controllers.GetUser,
		AuthRequired: false,
	},
	Route{
		URI:          "/users/{id}",
		Method:       http.MethodPut,
		Handler:      controllers.UpdateUser,
		AuthRequired: true,
	},
	Route{
		URI:          "/users/{id}",
		Method:       http.MethodDelete,
		Handler:      controllers.DeleteUser,
		AuthRequired: true,
	},
}
