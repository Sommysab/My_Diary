FROM golang:1.17.6-alpine3.15 AS build
RUN apk --no-cache add gcc g++ make git
WORKDIR /go/src/backend
COPY . .
RUN go mod init backend
RUN go mod tidy
RUN GOOS=linux go build -ldflags="-s -w" -o ./bin/webserver ./main.go

FROM alpine:3.10
COPY --from=build /go/src/backend/bin /go/bin
EXPOSE 8010
ENTRYPOINT /go/bin/webserver