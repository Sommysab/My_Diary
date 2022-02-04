FROM golang
WORKDIR /app/src/backend
ENV GOPATH=/app
COPY . /app/src/backend

# sudo apt-get install build-essential
# RUN apt -y update
# ENV TZ=Africa/Lagos
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN go get -u github.com/go-sql-driver/mysql
RUN go get -u github.com/mattn/go-sqlite3
RUN go get -u github.com/jinzhu/gorm
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/joho/godotenv
RUN go get -u golang.org/x/crypto/bcrypt
RUN go get -u github.com/dgrijalva/jwt-go
RUN go get -u github.com/badoux/checkmail
RUN go get -u github.com/dgrijalva/jwt-go/request

RUN go build -o main .
CMD [ "./main" ]

