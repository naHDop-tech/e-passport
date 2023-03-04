package api

import (
	"errors"
	"strings"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

func (s *Server) uploadPhoto(ctx *gin.Context) {
	var response responser.Response
	fileName := ctx.PostForm("name")
	fileTags := ctx.PostForm("tags")
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

	//uuidUserID, err := uuid.Parse(*reqParams.UserId)
	//if err != nil {
	//	response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
	//	ctx.JSON(response.Status, response)
	//	return
	//}

	result, err := s.fileManager.UploadFile(ctx, file, uploader.UploadParams{
		PublicID: fileName,
		// Split the tags by comma
		Tags: strings.Split(",", fileTags),
	})

	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(result, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

func (s *Server) updatePhoto(ctx *gin.Context) {

}
