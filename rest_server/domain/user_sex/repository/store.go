package repository

import "database/sql"

type UserSexStore struct {
	*Queries
	db *sql.DB
}

func NewUserSexStore(db *sql.DB) *UserSexStore {
	return &UserSexStore{
		db:      db,
		Queries: New(db),
	}
}
