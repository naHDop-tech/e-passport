package phone

import (
	"context"
	"database/sql"
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
		_, err := q.GetUserById(ctx, params.UserID)
		if err != nil {
			return err
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
