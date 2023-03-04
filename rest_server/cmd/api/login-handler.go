package api

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/utils/responser"
)

type loginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (s *Server) login(ctx *gin.Context) {
	var response responser.Response
	var req loginRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_NOT_FOUND)
		ctx.JSON(response.Status, response)
		return
	}

	token, err := s.loginSrv.Login(ctx, struct {
		Email         string
		Password      string
		TokenDuration time.Duration
	}{Email: req.Email, Password: req.Password, TokenDuration: s.config.AccessTokenDuration})
	if err != nil {
		response = s.responser.New(nil, err, responser.API_FAIL)
		ctx.JSON(response.Status, response)
		return
	}
	user, err := s.userDomain.GetUserByEmail(ctx, req.Email)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_NOT_FOUND)
		ctx.JSON(response.Status, response)
		return
	}
	response = s.responser.New(struct {
		token  string
		userId string
	}{token: token, userId: user.ID.String()}, err, responser.API_NOT_FOUND)
	ctx.JSON(response.Status, response)
	return
}
