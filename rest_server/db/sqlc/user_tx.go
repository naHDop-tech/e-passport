package db

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
)

type ClassName string
type RoleName string

const (
	Draft ClassName = "Draft"
	Base            = "Base"
	Full            = "Full"
	Nft             = "Nft"
)

const (
	Customer RoleName = "Customer"
	Admin             = "Admin"
	Manager           = "Manager"
	Noname            = "Noname"
)

type CreateDraftUserParams struct {
	Email     string
	Password  string
	ClassName ClassName
	RoleName  RoleName
}

func (s *Store) CreateUserTx(ctx context.Context, arg CreateDraftUserParams) (CreateUserRow, error) {
	var result CreateUserRow
	return result, nil

	err := s.execTx(ctx, func(q *Queries) error {
		var err error
		var class RoleClass
		class, err = q.GetRoleClass(ctx, string(arg.ClassName))
		if err != nil {
			return err
		}

		var roleId uuid.UUID
		roleId, err = q.CreateUserRole(ctx, CreateUserRoleParams{
			Name:  string(arg.RoleName),
			Class: sql.NullString{String: class.Class, Valid: true},
		})
		if err != nil {
			return err
		}

		// TODO: Implement password hashing
		result, err = q.CreateUser(ctx, CreateUserParams{
			Email:        arg.Email,
			PasswordHash: arg.Password,
			RoleID:       uuid.NullUUID{UUID: roleId, Valid: true},
		})
		if err != nil {
			return err
		}

		return nil
	})

	return result, err
}
