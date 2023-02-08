package api

import (
	"database/sql"
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
	uuidUserID, err := uuid.FromBytes([]byte(req.UserID))
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

type updateUserPhone struct {
	PhoneID     string `json:"phone_id" binding:"required"`
	CountryCode string `json:"country_code" binding:"required"`
	Number      string `json:"number" binding:"required"`
}

//func (s *Server) UpdatePhone(ctx *gin.Context) {
//	var req createPhoneRequest
//	err := ctx.ShouldBindJSON(&req)
//
//	if err != nil {
//		ctx.JSON(http.StatusBadRequest, errorResponse(err))
//		return
//	}
//
//	phoneDomain := phone.NewPhone(s.connect)
//}
