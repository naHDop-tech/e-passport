package repository

import "database/sql"

type FingerPrintStore struct {
	*Queries
	db *sql.DB
}

func NewFingerPrintStore(db *sql.DB) *FingerPrintStore {
	return &FingerPrintStore{
		db:      db,
		Queries: New(db),
	}
}
