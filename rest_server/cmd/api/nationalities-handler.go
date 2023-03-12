package api

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/utils/responser"
)

func (s *Server) getNationalities(ctx *gin.Context) {
	var response responser.Response

	nationalities, err := s.nationalitiesDomain.GetNationalities(ctx)
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

	response = s.responser.New(nationalities, err, responser.API_OK)
	ctx.JSON(response.Status, response)
}
