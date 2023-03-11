package api

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/utils/responser"
)

func (s *Server) getCountries(ctx *gin.Context) {
	var response responser.Response

	countries, err := s.countriesDomain.GetCountries(ctx)
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

	response = s.responser.New(countries, err, responser.API_OK)
	ctx.JSON(response.Status, response)
}
