# FROM golang
# WORKDIR /app/src/backend
# ENV GOPATH=/app
# COPY . /app/src/backend

# # sudo apt-get install build-essential
# # RUN apt -y update
# # ENV TZ=Africa/Lagos
# # RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

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


FROM golang:1.12.7-alpine3.10 AS build
# Support CGO and SSL
RUN apk --no-cache add gcc g++ make
RUN apk add git
ENV GO111MODULE=on
WORKDIR /go/src/backend

COPY . .
RUN go get -u github.com/go-sql-driver/mysql
RUN go get -u github.com/mattn/go-sqlite3
RUN go get -u github.com/jinzhu/gorm
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/joho/godotenv
RUN go get -u golang.org/x/crypto/bcrypt
RUN go get -u github.com/dgrijalva/jwt-go
RUN go get -u github.com/badoux/checkmail
RUN go get -u github.com/dgrijalva/jwt-go/request
RUN GOOS=linux go build -ldflags="-s -w" -o ./bin/test ./main.go

FROM alpine:3.10
RUN apk --no-cache add ca-certificates
WORKDIR /usr/bin
COPY --from=build /go/src/backend/bin /go/bin
EXPOSE 8000
ENTRYPOINT /go/bin/test --port 8000

# FROM alpine:3.10
# COPY --from=build /go/src/app/bin /go/bin
# EXPOSE 8080
# ENTRYPOINT /go/bin/webserver