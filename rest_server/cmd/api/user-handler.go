package api

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"net/http"
)

type createUserRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type getUserByIdRequest struct {
	ID *string `uri:"id" binding:"omitempty,uuid"`
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

func (s *Server) getById(ctx *gin.Context) {
	var req getUserByIdRequest
	var err error
	err = ctx.ShouldBindUri(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var user db.GetUserByIdRow
	_ID, _ := uuid.Parse(*req.ID)
	user, err = s.store.GetUserById(ctx, _ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, user)
	return
}
