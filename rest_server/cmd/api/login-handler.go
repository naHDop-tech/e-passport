package api

import (
	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/services/login"
	"net/http"
)

type loginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (s *Server) login(ctx *gin.Context) {
	var req loginRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	userDomain := user.NewUser(s.connect)
	loginService := login.NewLoginService(userDomain)
	token, err := loginService.Login(ctx, struct {
		Email    string
		Password string
	}{Email: req.Email, Password: req.Password})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, token)
	return
}
