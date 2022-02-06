package main

import (
	f "fmt"
	"log"
	"net/http"
	"strings"

	"path/filepath"

	"os"
	"time"

	"backend/api/router"
	"backend/config"
)

func init() {
	config.Load()
	// auto.Load()
}

type spaHandler struct {
	staticPath string
	indexPath  string
	env        string
}

// Windows OS modification
func modifyPath(path string, h spaHandler) string {
	// path
	if h.env == "development" {
		path = strings.Replace(path, `C:\`, "/", 1)
	}
	return path
}

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler. If a file is found, it will be served. If not, the
// file located at the index path on the SPA handler will be served. This
// is suitable behavior for serving an SPA (single page application).
func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)

	path = modifyPath(path, h) // strings.Replace(path, `C:\`, "/", 1)

	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	// Router
	r := router.New()

	// Serving Static Files
	spa := spaHandler{staticPath: "client/build", indexPath: "index.html", env: config.ENV}
	r.PathPrefix("/").Handler(spa)

	// f.Printf("env:%s", config.ENV)

	srv := &http.Server{
		Handler: r,
		Addr:    ":8010", // + strconv.FormatUint(uint64(config.PORT), 10),
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	f.Printf("\n\tListening [::]:%d", config.PORT)
	log.Fatal(srv.ListenAndServe())
}

// package main

// import (
// 	"fmt"
// 	"log"
// 	"net/http"

// 	"github.com/gorilla/mux"
// )

// func helloHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Hello!\\nYour HTTP request method is %s\\n", r.Method)
// 	w.WriteHeader(http.StatusAccepted)
// }

// func main() {
// 	r := mux.NewRouter()
// 	r.HandleFunc("/", helloHandler).Methods("GET")
// 	log.Fatal(http.ListenAndServe(":8010", r))
// }
