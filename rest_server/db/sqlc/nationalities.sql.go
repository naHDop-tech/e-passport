// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: nationalities.sql

package db

import (
	"context"
)

const listNationalities = `-- name: ListNationalities :many
SELECT code, alpha_2, alpha_3, nationality FROM nationalities
ORDER BY alpha_2
`

func (q *Queries) ListNationalities(ctx context.Context) ([]Nationality, error) {
	rows, err := q.db.QueryContext(ctx, listNationalities)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Nationality{}
	for rows.Next() {
		var i Nationality
		if err := rows.Scan(
			&i.Code,
			&i.Alpha2,
			&i.Alpha3,
			&i.Nationality,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
