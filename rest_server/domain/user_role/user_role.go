package user_role

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/db/sqlc"
)

type RoleName string

func (rn *RoleName) String() string {
	return rn.String()
}

const (
	Customer RoleName = "Customer"
	Admin             = "Admin"
	Manager           = "Manager"
	Noname            = "Noname"
)

type UserRole struct {
	repository *db.Store
}

func NewUserRole(conn *sql.DB) *UserRole {
	return &UserRole{
		repository: db.NewStore(conn),
	}
}

func (ur *UserRole) CreateUserRole(ctx context.Context, payload db.CreateUserRoleParams) (uuid.UUID, error) {
	role, err := ur.repository.CreateUserRole(ctx, payload)
	if err != nil {
		return uuid.Nil, err
	}
	return role, nil
}
