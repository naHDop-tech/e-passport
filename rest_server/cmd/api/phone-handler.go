package api

import (
	"database/sql"
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/domain/phone"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type createPhoneRequest struct {
	CountryCode string `json:"country_code" binding:"required,min=1,max=3"`
	Number      string `json:"number" binding:"required,min=7,max=13"`
}

type createPhoneRequestIdParams struct {
	UserId *string `uri:"user_id" binding:"required,uuid"`
}

type createPhoneResponse struct {
	Status string `json:"status"`
}

func (s *Server) createPhone(ctx *gin.Context) {
	var response responser.Response
	var req createPhoneRequest
	err := ctx.ShouldBindJSON(&req)

	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var reqParams createPhoneRequestIdParams

	err = ctx.ShouldBindUri(&reqParams)
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
	arg := phone.CreateUserPhoneParams{
		UserId:      uuidUserID,
		CountryCode: req.CountryCode,
		Number:      req.Number,
	}

	err = s.phoneDomain.CreatePhone(ctx, arg)

	if err != nil {
		if err == sql.ErrNoRows {
			response = s.responser.New(nil, err, responser.API_NOT_FOUND)
			ctx.JSON(response.Status, response)
			return
		}
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(createPhoneResponse{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

type updateUserPhoneRequest struct {
	CountryCode string `json:"country_code" binding:"required,min=1,max=3"`
	Number      string `json:"number" binding:"required,min=7,max=13"`
}

type updateUserPhoneRequestIdParam struct {
	PhoneId *string `uri:"phone_id" binding:"required,uuid"`
	UserId  *string `uri:"user_id" binding:"required,uuid"`
}

type updatePhoneResponse struct {
	status string
}

func (s *Server) updatePhone(ctx *gin.Context) {
	var response responser.Response
	var req updateUserPhoneRequest
	err := ctx.ShouldBindJSON(&req)

	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var reqParams updateUserPhoneRequestIdParam
	err = ctx.ShouldBindUri(&reqParams)
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

	uuidPhoneID, err := uuid.Parse(*reqParams.PhoneId)
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

	arg := phone.UpdateUserPhoneParams{
		UserId:      uuidUserID,
		PhoneId:     uuidPhoneID,
		CountryCode: req.CountryCode,
		Number:      req.Number,
	}

	err = s.phoneDomain.UpdatePhone(ctx, arg)
	if err != nil {
		if err == sql.ErrNoRows {
			response = s.responser.New(nil, err, responser.API_NOT_FOUND)
			ctx.JSON(response.Status, response)
			return
		}
		response = s.responser.New(nil, err, responser.API_FAIL)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(createPhoneResponse{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}
