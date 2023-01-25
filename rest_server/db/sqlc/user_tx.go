package db

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
)

type CreateDraftUserParams struct {
	Email    string `json:"email"`
	Password string `json:"password_hash"`
}

func (s *Store) CreateUserTx(ctx context.Context, arg CreateDraftUserParams) (CreateUserRow, error) {
	var user CreateUserRow
	return user, nil

	err := s.execTx(ctx, func(q *Queries) error {
		var err error
		var class RoleClass
		class, err = q.GetRoleClass(ctx, "Draft")
		if err != nil {
			return err
		}

		var roleId uuid.UUID
		roleId, err = q.CreateUserRole(ctx, CreateUserRoleParams{
			Name:  "Client",
			Class: sql.NullString{String: class.Class, Valid: true},
		})
		if err != nil {
			return err
		}

		userRoleId := uuid.NullUUID{
			UUID:  roleId,
			Valid: true,
		}
		user, err = q.CreateUser(ctx, CreateUserParams{
			Email:        arg.Email,
			PasswordHash: arg.Password,
			RoleID:       userRoleId,
		})
		if err != nil {
			return err
		}

		return nil
	})

	return user, err
}
