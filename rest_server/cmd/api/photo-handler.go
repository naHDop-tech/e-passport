package api

import (
	"errors"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

func (s *Server) uploadPhoto(ctx *gin.Context) {
	var response responser.Response
	file, _, err := ctx.Request.FormFile("file")
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

	err = s.photoDomain.UploadFile(ctx, file, uploader.UploadParams{}, uuidUserID)

	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

type updatePhotoRequestParams struct {
	PhotoId *string `uri:"photo_id" binding:"required,uuid"`
	UserId  *string `uri:"user_id" binding:"required,uuid"`
}

func (s *Server) updatePhoto(ctx *gin.Context) {
	var response responser.Response
	file, _, err := ctx.Request.FormFile("file")
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	var reqParams updatePhotoRequestParams
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

	uuidPhotoID, err := uuid.Parse(*reqParams.PhotoId)
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

	err = s.photoDomain.UpdateFile(ctx, file, uploader.UploadParams{}, uuidUserID, uuidPhotoID)

	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}
