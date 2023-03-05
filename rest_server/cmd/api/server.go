package api

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/naHDop-tech/e-passport/domain/address"
	"github.com/naHDop-tech/e-passport/domain/phone"
	"github.com/naHDop-tech/e-passport/domain/photo"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/services/login"
	"github.com/naHDop-tech/e-passport/utils"
	file_manager "github.com/naHDop-tech/e-passport/utils/file-manager"
	"github.com/naHDop-tech/e-passport/utils/responser"
	"github.com/naHDop-tech/e-passport/utils/token"
)

type Server struct {
	router        *gin.Engine
	tokenMaker    token.Maker
	connect       *sql.DB
	config        utils.Config
	userDomain    *user.User
	phoneDomain   *phone.Phone
	addressDomain *address.Address
	photoDomain   photo.PhotoResolver
	loginSrv      *login.LoginService
	fileManager   file_manager.FileManager
	responser     responser.Responser
}

type userIdRequestParams struct {
	UserId *string `uri:"user_id" binding:"required,uuid"`
}

type responseStatus struct {
	Status string `json:"status"`
}

func NewServer(
	conf utils.Config,
	conn *sql.DB,
	fileManager file_manager.FileManager,
	userDomain *user.User,
	phoneDomain *phone.Phone,
	addressDomain *address.Address,
	photoDomain photo.PhotoResolver,
	loginSrv *login.LoginService,
) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(conf.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker %s", err)
	}
	server := &Server{
		config:        conf,
		connect:       conn,
		fileManager:   fileManager,
		tokenMaker:    tokenMaker,
		userDomain:    userDomain,
		phoneDomain:   phoneDomain,
		addressDomain: addressDomain,
		photoDomain:   photoDomain,
		loginSrv:      loginSrv,
		responser:     responser.NewResponser(),
	}

	server.setupRouter()
	return server, nil
}

func (s *Server) Start(address string) error {
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func successResponse(data any) gin.H {
	return gin.H{"data": data}
}
