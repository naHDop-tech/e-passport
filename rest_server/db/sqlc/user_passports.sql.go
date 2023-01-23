// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: user_passports.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createUserPassport = `-- name: CreateUserPassport :one
INSERT INTO user_passports
(
    country_code,
    issuing_organization,
    mrz_l1,
    mrz_l2,
    u_number,
    p_number,
    issue_date,
    expiration_date,
    place_of_birth,
    "type",
    finger_print_id
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, country_code, issuing_organization, mrz_l1, mrz_l2, u_number, p_number, issue_date, expiration_date, place_of_birth, type, finger_print_id, created_at, updated_at
`

type CreateUserPassportParams struct {
	CountryCode         sql.NullString `json:"country_code"`
	IssuingOrganization string         `json:"issuing_organization"`
	MrzL1               string         `json:"mrz_l1"`
	MrzL2               string         `json:"mrz_l2"`
	UNumber             string         `json:"u_number"`
	PNumber             string         `json:"p_number"`
	IssueDate           time.Time      `json:"issue_date"`
	ExpirationDate      time.Time      `json:"expiration_date"`
	PlaceOfBirth        string         `json:"place_of_birth"`
	Type                string         `json:"type"`
	FingerPrintID       uuid.NullUUID  `json:"finger_print_id"`
}

func (q *Queries) CreateUserPassport(ctx context.Context, arg CreateUserPassportParams) (UserPassport, error) {
	row := q.db.QueryRowContext(ctx, createUserPassport,
		arg.CountryCode,
		arg.IssuingOrganization,
		arg.MrzL1,
		arg.MrzL2,
		arg.UNumber,
		arg.PNumber,
		arg.IssueDate,
		arg.ExpirationDate,
		arg.PlaceOfBirth,
		arg.Type,
		arg.FingerPrintID,
	)
	var i UserPassport
	err := row.Scan(
		&i.ID,
		&i.CountryCode,
		&i.IssuingOrganization,
		&i.MrzL1,
		&i.MrzL2,
		&i.UNumber,
		&i.PNumber,
		&i.IssueDate,
		&i.ExpirationDate,
		&i.PlaceOfBirth,
		&i.Type,
		&i.FingerPrintID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserPassport = `-- name: GetUserPassport :one
SELECT id, country_code, issuing_organization, mrz_l1, mrz_l2, u_number, p_number, issue_date, expiration_date, place_of_birth, type, finger_print_id, created_at, updated_at FROM user_passports
WHERE id = $1
`

func (q *Queries) GetUserPassport(ctx context.Context, id uuid.UUID) (UserPassport, error) {
	row := q.db.QueryRowContext(ctx, getUserPassport, id)
	var i UserPassport
	err := row.Scan(
		&i.ID,
		&i.CountryCode,
		&i.IssuingOrganization,
		&i.MrzL1,
		&i.MrzL2,
		&i.UNumber,
		&i.PNumber,
		&i.IssueDate,
		&i.ExpirationDate,
		&i.PlaceOfBirth,
		&i.Type,
		&i.FingerPrintID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const updateUserPassport = `-- name: UpdateUserPassport :exec
UPDATE user_passports SET
    country_code = $1,
    issuing_organization = $2,
    mrz_l1 = $3,
    mrz_l2 = $4,
    u_number = $5,
    p_number = $6,
    issue_date = $7,
    expiration_date = $8,
    place_of_birth = $9,
    "type" = $10,
    finger_print_id = $11,
    updated_at = $12
WHERE id = $13
`

type UpdateUserPassportParams struct {
	CountryCode         sql.NullString `json:"country_code"`
	IssuingOrganization string         `json:"issuing_organization"`
	MrzL1               string         `json:"mrz_l1"`
	MrzL2               string         `json:"mrz_l2"`
	UNumber             string         `json:"u_number"`
	PNumber             string         `json:"p_number"`
	IssueDate           time.Time      `json:"issue_date"`
	ExpirationDate      time.Time      `json:"expiration_date"`
	PlaceOfBirth        string         `json:"place_of_birth"`
	Type                string         `json:"type"`
	FingerPrintID       uuid.NullUUID  `json:"finger_print_id"`
	UpdatedAt           sql.NullTime   `json:"updated_at"`
	ID                  uuid.UUID      `json:"id"`
}

func (q *Queries) UpdateUserPassport(ctx context.Context, arg UpdateUserPassportParams) error {
	_, err := q.db.ExecContext(ctx, updateUserPassport,
		arg.CountryCode,
		arg.IssuingOrganization,
		arg.MrzL1,
		arg.MrzL2,
		arg.UNumber,
		arg.PNumber,
		arg.IssueDate,
		arg.ExpirationDate,
		arg.PlaceOfBirth,
		arg.Type,
		arg.FingerPrintID,
		arg.UpdatedAt,
		arg.ID,
	)
	return err
}
