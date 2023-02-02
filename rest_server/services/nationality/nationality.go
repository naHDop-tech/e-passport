package nationality

import (
	"context"
	"database/sql"
	"github.com/naHDop-tech/e-passport/domain/nationalities/repository"
)

type NationalityService struct {
	store *repository.NationalityStore
}

func NewNationalityService(conn *sql.DB) *NationalityService {
	return &NationalityService{
		store: repository.NewNationalityStore(conn),
	}
}

func (ns *NationalityService) GetCountries(ctx context.Context) ([]repository.Nationality, error) {
	nationalities, err := ns.store.ListNationalities(ctx)
	if err != nil {
		return nil, err
	}

	return nationalities, nil
}
