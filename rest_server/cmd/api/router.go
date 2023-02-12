package api

import "github.com/gin-gonic/gin"

func (s *Server) setupRouter() {
	router := gin.Default()

	router.POST("/user", s.createUser)
	router.GET("/user/:id", s.getById)

	router.POST("/login", s.login)

	router.POST("/phone", s.createPhone)
	router.PATCH("/phone/:phone_id", s.updatePhone)

	s.router = router
}
