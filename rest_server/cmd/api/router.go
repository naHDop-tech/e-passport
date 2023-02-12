package api

import "github.com/gin-gonic/gin"

func (s *Server) setupRouter() {
	router := gin.Default()

	router.POST("/user", s.createUser)
	router.POST("/login", s.login)

	authGroupRoute := router.Group("/").Use(authMiddleware(s.tokenMaker))
	authGroupRoute.GET("/user/:user_id", s.getById)

	authGroupRoute.POST("/user/:user_id/phone", s.createPhone)
	authGroupRoute.PATCH("/user/:user_id/phone/:phone_id", s.updatePhone)

	s.router = router
}
