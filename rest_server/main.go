package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/naHDop-tech/e-passport/cmd/api"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"log"
)

const (
	host          = "0.0.0.0"
	port          = 5432
	user          = "di-passport-user"
	password      = "1qaz2wsx"
	dbname        = "di-passport-db"
	serverAddress = "0.0.0.0:8008"
	dbDriver      = "postgres"
)

func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	conn, err := sql.Open(dbDriver, psqlInfo)
	if err != nil {
		log.Fatal("Could not connect to db:", err)
	}
	defer conn.Close()

	err = conn.Ping()
	if err != nil {
		panic(err)
	}

	store := db.NewStore(conn)
	server := api.NewServer(store)

	err = server.Start(serverAddress)
	if err != nil {
		log.Fatal("Server has not started", err)
	}
}
