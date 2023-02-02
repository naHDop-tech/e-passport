package finger_print

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
	"github.com/naHDop-tech/e-passport/domain/finger_print/repository"
)

type FingerPrintService struct {
	store *repository.FingerPrintStore
}

func NewFingerPrintService(conn *sql.DB) *FingerPrintService {
	return &FingerPrintService{
		store: repository.NewFingerPrintStore(conn),
	}
}

func (fps *FingerPrintService) CreateFingerPrint(ctx context.Context, publicKey string) (uuid.UUID, error) {
	fpID, err := fps.store.CreateFingerPrint(ctx, publicKey)
	if err != nil {
		return uuid.Nil, err
	}

	return fpID, nil
}
