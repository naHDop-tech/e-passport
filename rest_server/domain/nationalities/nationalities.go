package nationalities

import (
	"context"
	"database/sql"

	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type Nationality struct {
	repository *db.Store
}

func NewNationality(conn *sql.DB) *Nationality {
	return &Nationality{
		repository: db.NewStore(conn),
	}
}

func (n *Nationality) GetNationalities(ctx context.Context) (*[]db.Nationality, error) {
	nationalities, err := n.repository.ListNationalities(ctx)
	if err != nil {
		return nil, err
	}
	return &nationalities, nil
}
