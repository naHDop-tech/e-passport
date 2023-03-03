package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
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

	token, err := s.loginSrv.Login(ctx, struct {
		Email         string
		Password      string
		TokenDuration time.Duration
	}{Email: req.Email, Password: req.Password, TokenDuration: s.config.AccessTokenDuration})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	user, _ := s.userDomain.GetUserByEmail(ctx, req.Email)
	var result = map[string]string{"token": token, "userId": user.ID.String()}
	ctx.JSON(http.StatusOK, successResponse(result))
	return
}
