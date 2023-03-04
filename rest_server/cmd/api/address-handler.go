package api

import (
	"database/sql"
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/domain/address"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type addressResponse struct {
	Country string `json:"country" binding:"required,min=3,max=30"`
	City    string `json:"city" binding:"required,min=3,max=30"`
	Line1   string `json:"line_1" binding:"required,min=3,max=30"`
	Line2   string `json:"line_2" binding:"required,min=3,max=30"`
	Zip     string `json:"zip" binding:"required,min=6,max=6"`
}

func (s *Server) createAddress(ctx *gin.Context) {
	var response responser.Response
	var request addressResponse
	err := ctx.ShouldBindJSON(&request)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var reqParams userIdRequestParams
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

	payload := address.CreateUserAddressParams{
		UserId:  uuidUserID,
		Country: request.Country,
		City:    request.City,
		Line1:   request.Line1,
		Line2:   request.Line2,
		Zip:     request.Zip,
	}

	err = s.addressDomain.CreateAddress(ctx, payload)
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

	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

type updateAddressRequestParams struct {
	AddressId *string `uri:"address_id" binding:"required,uuid"`
	UserId    *string `uri:"user_id" binding:"required,uuid"`
}

func (s *Server) updateAddress(ctx *gin.Context) {
	var response responser.Response
	var request addressResponse
	err := ctx.ShouldBindJSON(&request)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var reqParams updateAddressRequestParams
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

	uuidAddressID, err := uuid.Parse(*reqParams.AddressId)
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

	payload := address.UpdateUserAddressParams{
		UserId:  uuidUserID,
		ID:      uuidAddressID,
		Country: request.Country,
		City:    request.City,
		Line1:   request.Line1,
		Line2:   request.Line2,
		Zip:     request.Zip,
	}

	err = s.addressDomain.UpdateAddress(ctx, payload)
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

	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}
