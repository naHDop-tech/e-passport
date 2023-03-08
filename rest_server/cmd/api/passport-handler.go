package api

import (
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/domain/passport"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type createPassportParams struct {
	CountryCode  string `json:"country_code" binding:"required,min=3"`
	PlaceOfBirth string `json:"place_of_birth" binding:"required,min=10"`
	PublicKey    string `json:"public_key" binding:"required,min=20"`
}

func (s *Server) createPassport(ctx *gin.Context) {
	var response responser.Response
	var reqParams userIdRequestParams
	err := ctx.ShouldBindUri(&reqParams)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var request createPassportParams
	err = ctx.ShouldBindJSON(&request)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	val := ctx.MustGet(authPayloadKey).(*token.Payload)
	if val.UserId != *reqParams.UserId {
		err = errors.New("you do not have access to this user")
		response = s.responser.New(nil, err, responser.API_UNAUTH)
		ctx.JSON(response.Status, response)
		return
	}

	uuidUserID, err := uuid.Parse(*reqParams.UserId)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	payload := passport.CreatePassportParams{
		CountryCode:  request.CountryCode,
		PlaceOfBirth: request.PlaceOfBirth,
		UserId:       uuidUserID,
		PublicKey:    request.PublicKey,
	}

	_, err = s.passportDomain.Create(ctx, payload)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}
	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

type updatePassportRequestParams struct {
	PassportId *string `uri:"passport_id" binding:"required,uuid"`
	UserId     *string `uri:"user_id" binding:"required,uuid"`
}

func (s *Server) updatePassport(ctx *gin.Context) {
	var response responser.Response
	var reqParams updatePassportRequestParams
	err := ctx.ShouldBindUri(&reqParams)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var request createPassportParams
	err = ctx.ShouldBindJSON(&request)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	val := ctx.MustGet(authPayloadKey).(*token.Payload)
	if val.UserId != *reqParams.UserId {
		err = errors.New("you do not have access to this user")
		response = s.responser.New(nil, err, responser.API_UNAUTH)
		ctx.JSON(response.Status, response)
		return
	}

	uuidPassportID, err := uuid.Parse(*reqParams.PassportId)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	uuidUserID, err := uuid.Parse(*reqParams.UserId)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	payload := passport.UpdatePassportParams{
		CountryCode:  request.CountryCode,
		PlaceOfBirth: request.PlaceOfBirth,
		UserId:       uuidUserID,
		PublicKey:    request.PublicKey,
		PassportId:   uuidPassportID,
	}

	err = s.passportDomain.Update(ctx, payload)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}
