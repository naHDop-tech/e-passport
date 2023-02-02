package role_class

import (
	"context"
	"database/sql"
	"github.com/naHDop-tech/e-passport/domain/role_classes/repository"
)

type RoleClassService struct {
	store *repository.RoleClassStore
}

func NewRoleClassService(conn *sql.DB) *RoleClassService {
	return &RoleClassService{
		store: repository.NewRoleClasStore(conn),
	}
}

func (rcs *RoleClassService) CreateRoleClass(ctx context.Context, className string) (string, error) {
	roleClass, err := rcs.store.CreateRoleClass(ctx, className)
	if err != nil {
		return "", err
	}

	return roleClass, nil
}

func (rcs *RoleClassService) GetRoleByName(ctx context.Context, className string) (repository.RoleClass, error) {
	role, err := rcs.store.GetRoleClass(ctx, className)
	if err != nil {
		return repository.RoleClass{}, err
	}

	return role, nil
}
