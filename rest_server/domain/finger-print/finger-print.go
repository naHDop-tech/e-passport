package finger_print

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type FingerPrintResolver interface {
	Create(ctx context.Context, publicKey string) (*uuid.UUID, error)
	Update(ctx context.Context, params db.UpdateFingerPrintParams) error
}

type FingerPrint struct {
	repository *db.Store
}

func NewFingerPrint(conn *sql.DB) FingerPrintResolver {
	return &FingerPrint{
		repository: db.NewStore(conn),
	}
}

func (f FingerPrint) Create(ctx context.Context, publicKey string) (*uuid.UUID, error) {
	fpId, err := f.repository.CreateFingerPrint(ctx, publicKey)
	if err != nil {
		return nil, err
	}

	return &fpId, nil
}

func (f FingerPrint) Update(ctx context.Context, params db.UpdateFingerPrintParams) error {
	err := f.repository.UpdateFingerPrint(ctx, params)
	return err
}
