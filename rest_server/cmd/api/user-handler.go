package api

import (
	"github.com/gin-gonic/gin"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"net/http"
)

type createUserRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (s *Server) createUser(ctx *gin.Context) {
	var req createUserRequest
	var err error
	err = ctx.ShouldBindJSON(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateDraftUserParams{
		Email:     req.Email,
		Password:  req.Password,
		ClassName: db.Draft,
		RoleName:  db.Customer,
	}

	var draftUser db.CreateUserRow
	draftUser, err = s.store.CreateUserTx(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, draftUser)
	return
}
