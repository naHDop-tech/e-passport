package countries

import (
	"context"
	"database/sql"
	"github.com/naHDop-tech/e-passport/db/sqlc"
)

type Country struct {
	repository *db.Store
}

func NewCountry(conn *sql.DB) *Country {
	return &Country{
		repository: db.NewStore(conn),
	}
}

func (c *Country) GetCountries(ctx context.Context) ([]db.Country, error) {
	countries, err := c.repository.ListCountries(ctx)
	if err != nil {
		return nil, err
	}
	return countries, nil
}
