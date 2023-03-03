package role_classes

import (
	"context"
	"database/sql"
	"github.com/naHDop-tech/e-passport/db/sqlc"
)

type ClassName string

func (cn *ClassName) String() string {
	return cn.String()
}

const (
	Draft ClassName = "Draft"
	Base            = "Base"
	Full            = "Full"
	Nft             = "Nft"
)

type RoleClasses struct {
	repository *db.Store
}

func NewRoleClasses(conn *sql.DB) *RoleClasses {
	return &RoleClasses{
		repository: db.NewStore(conn),
	}
}

func (rc *RoleClasses) GetListRoleClasses(ctx context.Context) (*[]db.RoleClass, error) {
	countries, err := rc.repository.ListRoleClasses(ctx)
	if err != nil {
		return nil, err
	}
	return &countries, nil
}

func (rc *RoleClasses) GetRoleClass(ctx context.Context, roleClass ClassName) (*db.RoleClass, error) {
	rClass, err := rc.repository.GetRoleClass(ctx, string(roleClass))
	if err != nil {
		return nil, err
	}
	return &rClass, nil
}
