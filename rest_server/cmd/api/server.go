package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/utils"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type Server struct {
	router     *gin.Engine
	tokenMaker token.Maker
	connect    *sql.DB
	config     utils.Config
}

func NewServer(conf utils.Config, conn *sql.DB) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(conf.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker %s", err)
	}
	server := &Server{
		config:     conf,
		connect:    conn,
		tokenMaker: tokenMaker,
	}

	server.setupRouter()
	return server, nil
}

func (s *Server) Start(address string) error {
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func successResponse(data any) gin.H {
	return gin.H{"data": data}
}
