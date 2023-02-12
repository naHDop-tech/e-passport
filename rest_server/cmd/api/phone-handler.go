package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/domain/phone"
	"net/http"
)

type createPhoneRequest struct {
	UserID      string `json:"user_id" binding:"required"`
	CountryCode string `json:"country_code" binding:"required"`
	Number      string `json:"number" binding:"required"`
}

func (s *Server) createPhone(ctx *gin.Context) {
	var req createPhoneRequest
	err := ctx.ShouldBindJSON(&req)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	phoneDomain := phone.NewPhone(s.connect)
	uuidUserID, err := uuid.Parse(req.UserID)
	fmt.Println("RAW UUID", req.UserID)
	fmt.Println("UUID", uuidUserID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	arg := phone.CreateUserPhoneParams{
		UserID:      uuidUserID,
		CountryCode: req.CountryCode,
		Number:      req.Number,
	}

	err = phoneDomain.CreatePhone(ctx, arg)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, true)
	return
}

type updateUserPhoneRequest struct {
	CountryCode string `json:"country_code" binding:"required"`
	Number      string `json:"number" binding:"required"`
}

type updateUserPhoneRequestIdParam struct {
	PhoneId *string `uri:"phone_id" binding:"omitempty,uuid"`
}

func (s *Server) updatePhone(ctx *gin.Context) {
	var req updateUserPhoneRequest
	err := ctx.ShouldBindJSON(&req)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var reqParams updateUserPhoneRequestIdParam
	err = ctx.ShouldBindUri(&reqParams)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	phoneDomain := phone.NewPhone(s.connect)
	uuidPhoneID, err := uuid.Parse(*reqParams.PhoneId)
	arg := phone.UpdateUserPhoneParams{
		PhoneId:     uuidPhoneID,
		CountryCode: req.CountryCode,
		Number:      req.Number,
	}

	err = phoneDomain.UpdatePhone(ctx, arg)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, true)
	return
}
