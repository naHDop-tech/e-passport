package main

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

	_ "github.com/lib/pq"
	"github.com/naHDop-tech/e-passport/cmd/api"
	"github.com/naHDop-tech/e-passport/domain/address"
	"github.com/naHDop-tech/e-passport/domain/phone"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/services/login"
	"github.com/naHDop-tech/e-passport/utils"
)

func main() {
	conf, err := utils.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not read from config:", err)
	}
	DbPort, _ := strconv.Atoi(conf.DBPort)
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		conf.DBHost, DbPort, conf.DBUser, conf.DBPassword, conf.DBName)

	conn, err := sql.Open(conf.DBDriver, psqlInfo)
	if err != nil {
		log.Fatal("Could not connect to db:", err)
	}
	defer conn.Close()

	err = conn.Ping()
	if err != nil {
		panic(err)
	}

	userDomain := user.NewUser(conn)
	phoneDomain := phone.NewPhone(conn)
	addressDomain := address.NewAddress(conn)
	loginSrv := login.NewLoginService(userDomain, conf)
	server, err := api.NewServer(conf, conn, userDomain, phoneDomain, addressDomain, loginSrv)
	if err != nil {
		log.Fatal("Server has not configured", err)
	}

	serverAddress := fmt.Sprintf("%s:%s", conf.AppHost, conf.AppPort)

	err = server.Start(serverAddress)
	if err != nil {
		log.Fatal("Server has not started", err)
	}
}
