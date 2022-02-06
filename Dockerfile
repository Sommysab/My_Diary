# FROM golang
# WORKDIR /app/src/backend
# ENV GOPATH=/app
# COPY . /app/src/backend
# RUN go get -u github.com/go-sql-driver/mysql
# RUN go get -u github.com/mattn/go-sqlite3
# RUN go get -u github.com/jinzhu/gorm
# RUN go get -u github.com/gorilla/mux
# RUN go get -u github.com/joho/godotenv
# RUN go get -u golang.org/x/crypto/bcrypt
# RUN go get -u github.com/dgrijalva/jwt-go
# RUN go get -u github.com/badoux/checkmail
# RUN go get -u github.com/dgrijalva/jwt-go/request
# RUN go build -o main .
# CMD [ "./main" ]



# FROM golang:1.17.6-alpine3.15 AS build
# # Support CGO and SSL
# RUN apk --no-cache add gcc g++ make
# RUN apk add git
# WORKDIR /go/src/backend
# ENV GO111MODULE=on
# COPY . .
# RUN go get -u github.com/go-sql-driver/mysql
# RUN go get -u github.com/mattn/go-sqlite3
# RUN go get -u github.com/jinzhu/gorm
# RUN go get -u github.com/gorilla/mux
# RUN go get -u github.com/joho/godotenv
# RUN go get -u golang.org/x/crypto/bcrypt
# RUN go get -u github.com/dgrijalva/jwt-go
# RUN go get -u github.com/badoux/checkmail
# RUN go get -u github.com/dgrijalva/jwt-go/request
# RUN GOOS=linux go build -ldflags="-s -w" -o ./bin/test ./main.go

# FROM alpine:3.10
# RUN apk --no-cache add ca-certificates
# WORKDIR /usr/bin
# COPY --from=build /go/src/backend/bin /go/bin
# EXPOSE 8000
# ENTRYPOINT /go/bin/test --port 8000


FROM golang:1.17.6-alpine3.15 AS build
RUN apk --no-cache add gcc g++ make git
WORKDIR /go/src/backend
COPY . .
# RUN go mod init webserver
# RUN go mod tidy
RUN go get -u github.com/go-sql-driver/mysql
RUN go get -u github.com/mattn/go-sqlite3
RUN go get -u github.com/jinzhu/gorm
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/joho/godotenv
RUN go get -u golang.org/x/crypto/bcrypt
RUN go get -u github.com/dgrijalva/jwt-go
RUN go get -u github.com/badoux/checkmail
RUN go get -u github.com/dgrijalva/jwt-go/request
RUN GOOS=linux go build -ldflags="-s -w" -o ./bin/web-app ./main.go

FROM alpine:3.10
RUN apk --no-cache add ca-certificates
WORKDIR /usr/bin
COPY --from=build /go/src/app/bin /go/bin
EXPOSE 8000
ENTRYPOINT /go/bin/web-app --port 8000