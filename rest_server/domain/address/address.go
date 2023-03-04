package address

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type Address struct {
	repository *db.Store
}

func NewAddress(conn *sql.DB) *Address {
	return &Address{
		repository: db.NewStore(conn),
	}
}

type CreateUserAddressParams struct {
	UserId  uuid.UUID
	Country string
	City    string
	Line1   string
	Line2   string
	Zip     string
}

func (a *Address) CreateAddress(ctx context.Context, params CreateUserAddressParams) error {
	err := a.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, err := q.GetUserById(ctx, params.UserId)
		if err != nil {
			return err
		}
		if existsUser.AddressID.Valid {
			return errors.New("user already have address")
		}

		addressId, err := q.CreateUserAddress(ctx, db.CreateUserAddressParams{
			Country: sql.NullString{Valid: true, String: params.Country},
			City:    params.City,
			Line1:   params.Line1,
			Line2:   params.Line2,
			Zip:     params.Zip,
		})
		if err != nil {
			return err
		}
		err = q.SetAddressRelation(ctx, db.SetAddressRelationParams{
			AddressID: uuid.NullUUID{UUID: addressId, Valid: true},
			ID:        existsUser.ID,
		})
		return err
	})

	return err
}

type UpdateUserAddressParams struct {
	UserId  uuid.UUID
	ID      uuid.UUID
	Country string
	City    string
	Line1   string
	Line2   string
	Zip     string
}

func (a *Address) UpdateAddress(ctx context.Context, payload UpdateUserAddressParams) error {
	existsUser, err := a.repository.GetUserById(ctx, payload.UserId)
	if err != nil {
		return err
	}
	if existsUser.AddressID.UUID.String() != payload.ID.String() {
		return errors.New("this address id related to other user")
	}

	existsAddress, err := a.repository.GetUserAddress(ctx, payload.ID)
	if err != nil {
		return err
	}
	if existsAddress.ID == uuid.Nil {
		return errors.New("address not exists")
	}

	address := db.UpdateUserAddressParams{
		Country:   sql.NullString{Valid: true, String: payload.Country},
		City:      payload.City,
		Line1:     payload.Line1,
		Line2:     payload.Line2,
		Zip:       payload.Zip,
		UpdatedAt: sql.NullTime{Valid: true, Time: time.Now()},
		ID:        existsAddress.ID,
	}

	err = a.repository.UpdateUserAddress(ctx, address)
	return err
}
