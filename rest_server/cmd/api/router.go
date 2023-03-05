package api

import (
	"github.com/gin-gonic/gin"
)

func (s *Server) setupRouter() {
	router := gin.Default()

	v1 := router.Group("/api/v1")

	v1.POST("/user", s.createUser)
	v1.POST("/login", s.login)

	v1AuthGroupRoute := v1.Group("/").Use(authMiddleware(s.tokenMaker))
	{
		v1AuthGroupRoute.GET("/user/:user_id", s.getById)

		v1AuthGroupRoute.POST("/user/:user_id/phone", s.createPhone)
		v1AuthGroupRoute.POST("/user/:user_id/address", s.createAddress)
		v1AuthGroupRoute.POST("/user/:user_id/photo", s.uploadPhoto)

		v1AuthGroupRoute.PATCH("/user/:user_id/phone/:phone_id", s.updatePhone)
		v1AuthGroupRoute.PATCH("/user/:user_id/address/:address_id", s.updateAddress)
		v1AuthGroupRoute.PATCH("/user/:user_id/photo/:photo_id", s.updatePhoto)
	}

	s.router = router
}
