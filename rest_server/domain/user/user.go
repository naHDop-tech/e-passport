package user

import (
	"context"
	"database/sql"
	"errors"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/db/sqlc"
	"github.com/naHDop-tech/e-passport/domain/role_classes"
	"github.com/naHDop-tech/e-passport/domain/user_role"
	"github.com/naHDop-tech/e-passport/utils"
)

type CreateDraftUserParams struct {
	Email     string
	Password  string
	ClassName role_classes.ClassName
	RoleName  user_role.RoleName
}

type User struct {
	repository *db.Store
}

func NewUser(conn *sql.DB) *User {
	return &User{
		repository: db.NewStore(conn),
	}
}

func (u *User) UpdateUser(ctx context.Context, params db.UpdateUserParams) error {
	user, err := u.repository.GetUserById(ctx, params.ID)
	if err != nil {
		return err
	}
	if user.ID != params.ID {
		return errors.New("user not exists")
	}
	err = u.repository.UpdateUser(ctx, params)
	if err != nil {
		return err
	}
	return nil
}

func (u *User) GetUserById(ctx context.Context, userId uuid.UUID) (db.GetUserByIdRow, error) {
	user, err := u.repository.GetUserById(ctx, userId)
	if err != nil {
		return db.GetUserByIdRow{}, err
	}
	return user, nil
}

func (u *User) GetUserByEmail(ctx context.Context, email string) (db.GetUserByEmailRow, error) {
	user, err := u.repository.GetUserByEmail(ctx, email)
	if err != nil {
		return db.GetUserByEmailRow{}, err
	}
	return user, nil
}

func (u *User) CreateUser(ctx context.Context, params CreateDraftUserParams) (db.CreateUserRow, error) {
	var result db.CreateUserRow

	err := u.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, _ := q.GetUserByEmail(ctx, params.Email)
		if existsUser.Email == params.Email {
			return errors.New("user with this email already exists")
		}

		class, err := q.GetRoleClass(ctx, params.ClassName.String())
		if err != nil {
			return err
		}

		var roleId uuid.UUID
		roleId, err = q.CreateUserRole(ctx, db.CreateUserRoleParams{
			Name:  params.RoleName.String(),
			Class: sql.NullString{String: class.Class, Valid: true},
		})
		if err != nil {
			return err
		}

		var pwdHash string
		pwdHash, err = utils.HashAndSalt([]byte(params.Password))
		if err != nil {
			return err
		}
		result, err = q.CreateUser(ctx, db.CreateUserParams{
			Email:        params.Email,
			PasswordHash: pwdHash,
			RoleID:       uuid.NullUUID{UUID: roleId, Valid: true},
		})
		if err != nil {
			return err
		}

		return err
	})

	return result, err
}
