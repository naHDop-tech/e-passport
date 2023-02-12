package api

import "github.com/gin-gonic/gin"

func (s *Server) setupRouter() {
	router := gin.Default()

	router.POST("/user", s.createUser)
	router.GET("/user/:user_id", s.getById)

	router.POST("/login", s.login)

	router.POST("/user/:user_id/phone", s.createPhone)
	router.PATCH("/user/:user_id/phone/:phone_id", s.updatePhone)

	s.router = router
}
