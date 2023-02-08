package phone

import (
	"context"
	"database/sql"
	"errors"
	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type Phone struct {
	repository *db.Store
}

func NewPhone(conn *sql.DB) *Phone {
	return &Phone{
		repository: db.NewStore(conn),
	}
}

type CreateUserPhoneParams struct {
	UserID      uuid.UUID
	CountryCode string
	Number      string
}

func (p *Phone) CreatePhone(ctx context.Context, params CreateUserPhoneParams) error {
	err := p.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, err := q.GetUserById(ctx, params.UserID)
		if err != nil {
			return err
		}
		if len(existsUser.PhoneNumber.String) > 1 {
			return errors.New("user already have phone")
		}

		existsPhone, _ := q.GetUserPhoneByNumberAndCode(ctx, db.GetUserPhoneByNumberAndCodeParams{
			CountryCode: params.CountryCode,
			Number:      params.Number,
		})
		if existsPhone.Number == params.Number {
			return errors.New("this phone number already using")
		}

		phoneId, err := q.CreateUserPhone(ctx, db.CreateUserPhoneParams{
			CountryCode: params.CountryCode,
			Number:      params.Number,
		})
		if err != nil {
			return err
		}

		err = q.SetPhoneRelation(ctx, db.SetPhoneRelationParams{
			PhoneID: uuid.NullUUID{UUID: phoneId, Valid: true},
			ID:      params.UserID,
		})

		return err
	})

	return err
}
