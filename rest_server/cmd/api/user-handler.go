package api

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"github.com/naHDop-tech/e-passport/domain/role_classes"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/domain/user_role"
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

	userDomain := user.NewUser(s.connect)

	arg := user.CreateDraftUserParams{
		Email:     req.Email,
		Password:  req.Password,
		ClassName: role_classes.Draft,
		RoleName:  user_role.Customer,
	}

	var draftUser db.CreateUserRow
	draftUser, err = userDomain.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, draftUser)
	return
}

type getUserByIdRequest struct {
	ID *string `uri:"id" binding:"omitempty,uuid"`
}

func (s *Server) getById(ctx *gin.Context) {
	var req getUserByIdRequest
	var err error
	err = ctx.ShouldBindUri(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	userDomain := user.NewUser(s.connect)
	var rawUser db.GetUserByIdRow
	parsedUserId, _ := uuid.Parse(*req.ID)
	rawUser, err = userDomain.GetUserById(ctx, parsedUserId)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	user := userDomain.MarshallToStruct(rawUser)

	ctx.JSON(http.StatusOK, user)
	return
}
