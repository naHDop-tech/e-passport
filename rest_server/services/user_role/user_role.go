package user_role

import (
	"database/sql"
	"github.com/naHDop-tech/e-passport/domain/user_role/repository"
)

type UserRoleService struct {
	store *repository.UserRoleStore
}

func NewUserSexService(conn *sql.DB) *UserRoleService {
	return &UserRoleService{
		store: repository.NewUserRoleStore(conn),
	}
}
