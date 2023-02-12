package api

import (
	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/services/login"
	"net/http"
	"time"
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
	loginService := login.NewLoginService(userDomain, s.config)
	token, err := loginService.Login(ctx, struct {
		Email         string
		Password      string
		TokenDuration time.Duration
	}{Email: req.Email, Password: req.Password, TokenDuration: s.config.AccessTokenDuration})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, token)
	return
}
