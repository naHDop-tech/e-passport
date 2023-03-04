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

type loginResponse struct {
	Token  string `json:"token"`
	UserId string `json:"userId"`
}

func (s *Server) login(ctx *gin.Context) {
	var response responser.Response
	var req loginRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
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

	result := loginResponse{
		Token:  token,
		UserId: user.ID.String(),
	}

	response = s.responser.New(result, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}
