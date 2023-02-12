package api

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/utils/token"
	"net/http"
	"strings"
)

const (
	authHeader     = "authorization"
	authType       = "bearer"
	authPayloadKey = "auth_payload"
)

func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader(authHeader)
		if len(authorizationHeader) == 0 {
			err := errors.New("authorization header has not provided")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			err := errors.New("authorization header invalid format")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		authorizationType := strings.ToLower(fields[0])
		if authorizationType != authType {
			err := errors.New("authorization header invalid type")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		accessToken := fields[1]
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		ctx.Set(authPayloadKey, payload)
		ctx.Next()
	}
}
