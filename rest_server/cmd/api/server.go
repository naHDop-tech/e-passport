package api

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Server struct {
	router  *gin.Engine
	connect *sql.DB
}

func NewServer(conn *sql.DB) *Server {
	server := &Server{connect: conn}
	router := gin.Default()

	router.POST("/user", server.createUser)
	router.GET("/user/:id", server.getById)

	router.POST("/login", server.login)

	router.POST("/phone", server.createPhone)
	router.PATCH("/phone/:phone_id", server.updatePhone)

	server.router = router
	return server
}

func (s *Server) Start(address string) error {
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
