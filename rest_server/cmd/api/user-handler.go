package api

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"github.com/naHDop-tech/e-passport/domain/role_classes"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/domain/user_role"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type createUserRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserResponse struct {
	user db.CreateUserRow
}

func (s *Server) createUser(ctx *gin.Context) {
	var req createUserRequest
	err := ctx.ShouldBindJSON(&req)
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

	draftUser, err := userDomain.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, successResponse(&draftUser))
	return
}

type getUserByIdRequest struct {
	UserId *string `uri:"user_id" binding:"omitempty,uuid"`
}

func (s *Server) getById(ctx *gin.Context) {
	var req getUserByIdRequest
	var err error
	err = ctx.ShouldBindUri(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	val := ctx.MustGet(authPayloadKey).(*token.Payload)
	if val.UserId != *req.UserId {
		err := errors.New("you do not have access to this user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	parsedUserId, err := uuid.Parse(*req.UserId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	rawUser, err := s.userDomain.GetUserById(ctx, parsedUserId)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	clearUser := s.userDomain.MarshallToStruct(rawUser)

	ctx.JSON(http.StatusOK, successResponse(clearUser))
	return
}
