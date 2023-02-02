package user_sex

import (
	"context"
	"database/sql"
	"github.com/naHDop-tech/e-passport/domain/user_sex/repository"
)

type UserSexService struct {
	store *repository.UserSexStore
}

func NewUserSexService(conn *sql.DB) *UserSexService {
	return &UserSexService{
		store: repository.NewUserSexStore(conn),
	}
}

func (uss *UserSexService) GetCountries(ctx context.Context) ([]string, error) {
	sexList, err := uss.store.ListUserSex(ctx)
	if err != nil {
		return nil, err
	}

	return sexList, nil
}
