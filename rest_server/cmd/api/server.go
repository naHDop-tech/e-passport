package api

import (
	"github.com/gin-gonic/gin"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type Server struct {
	store  *db.Store
	router *gin.Engine
}

func NewServer(db *db.Store) *Server {
	server := &Server{store: db}
	router := gin.Default()

	router.POST("/user", server.createUser)
	router.GET("/user/:id", server.getById)

	server.router = router
	return server
}

func (s *Server) Start(address string) error {
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
