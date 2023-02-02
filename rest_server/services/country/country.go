package country

import (
	"context"
	"database/sql"

	"github.com/naHDop-tech/e-passport/domain/countries/repository"
)

type CountryService struct {
	store *repository.CountryStore
}

func NewCountryService(conn *sql.DB) *CountryService {
	return &CountryService{
		store: repository.NewCountryStore(conn),
	}
}

func (cs *CountryService) GetCountries(ctx context.Context) ([]repository.Country, error) {
	countries, err := cs.store.ListCountries(ctx)
	if err != nil {
		return nil, err
	}

	return countries, nil
}
