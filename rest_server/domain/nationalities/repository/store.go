package repository

import "database/sql"

type NationalityStore struct {
	*Queries
	db *sql.DB
}

func NewNationalityStore(db *sql.DB) *NationalityStore {
	return &NationalityStore{
		db:      db,
		Queries: New(db),
	}
}
