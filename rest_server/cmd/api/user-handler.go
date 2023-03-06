package api

import (
	"database/sql"
	"errors"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"github.com/naHDop-tech/e-passport/domain/role_classes"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/domain/user_role"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type createUserRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserResponse struct {
	user db.CreateUserRow
}

type responseNewUser struct {
	ID    uuid.UUID `json:"id"`
	Email string    `json:"email"`
}

func (s *Server) createUser(ctx *gin.Context) {
	var response responser.Response
	var req createUserRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	arg := user.CreateDraftUserParams{
		Email:     req.Email,
		Password:  req.Password,
		ClassName: role_classes.Draft,
		RoleName:  user_role.Customer,
	}

	draftUser, err := s.userDomain.CreateUser(ctx, arg)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_FAIL)
		ctx.JSON(response.Status, response)
		return
	}

	response = s.responser.New(responseNewUser{
		ID:    draftUser.ID,
		Email: draftUser.Email,
	}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

type getUserByIdRequest struct {
	UserId *string `uri:"user_id" binding:"omitempty,uuid"`
}

func (s *Server) getById(ctx *gin.Context) {
	var response responser.Response
	var req getUserByIdRequest
	var err error
	err = ctx.ShouldBindUri(&req)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	val := ctx.MustGet(authPayloadKey).(*token.Payload)
	if val.UserId != *req.UserId {
		err = errors.New("you do not have access to this user")
		response = s.responser.New(nil, err, responser.API_UNAUTH)
		ctx.JSON(response.Status, response)
		return
	}

	parsedUserId, err := uuid.Parse(*req.UserId)
	if err != nil {
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	rawUser, err := s.userDomain.GetUserById(ctx, parsedUserId)
	if err != nil {
		if err == sql.ErrNoRows {
			response = s.responser.New(nil, err, responser.API_NOT_FOUND)
			ctx.JSON(response.Status, response)
			return
		}
		response = s.responser.New(nil, err, responser.API_BAD_REQUEST)
		ctx.JSON(response.Status, response)
		return
	}

	clearUser := s.userDomain.MarshallToStruct(rawUser)

	response = s.responser.New(clearUser, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}

type userRequest struct {
	FirstName   string    `json:"first_name" binding:"required,min=4,max=30"`
	LastName    string    `json:"last_name" binding:"required,min=4,max=30"`
	BirthDate   time.Time `json:"birth_date" binding:"required" time_format:"2006-01-02"`
	Nationality int32     `json:"nationality" binding:"required,min=3,max=3"`
	Sex         string    `json:"sex" binding:"required"`
}

func (s Server) updateUser(ctx *gin.Context) {
	var response responser.Response
	var request userRequest
	err := ctx.ShouldBindJSON(&request)
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

	payload := db.UpdateUserParams{
		FirstName:   sql.NullString{Valid: true, String: request.FirstName},
		LastName:    sql.NullString{Valid: true, String: request.LastName},
		BirthDate:   sql.NullTime{Valid: true, Time: request.BirthDate},
		Nationality: sql.NullInt32{Valid: true, Int32: request.Nationality},
		Sex:         sql.NullString{Valid: true, String: request.Sex},
		UpdatedAt:   sql.NullTime{Valid: true, Time: time.Now()},
		ID:          uuidUserID,
	}

	err = s.userDomain.UpdateUser(ctx, payload)
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

	response = s.responser.New(responseStatus{Status: "ok"}, err, responser.API_OK)
	ctx.JSON(response.Status, response)
	return
}
