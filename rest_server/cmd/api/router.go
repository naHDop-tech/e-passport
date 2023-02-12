package api

import "github.com/gin-gonic/gin"

func (s *Server) setupRouter() {
	router := gin.Default()

	router.POST("/user", s.createUser)
	router.POST("/login", s.login)

	authRoute := router.Group("/").Use(authMiddleware(s.tokenMaker))
	authRoute.GET("/user/:user_id", s.getById)

	authRoute.POST("/user/:user_id/phone", s.createPhone)
	authRoute.PATCH("/user/:user_id/phone/:phone_id", s.updatePhone)

	s.router = router
}
