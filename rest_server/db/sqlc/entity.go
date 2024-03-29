// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0

package db

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Country struct {
	Code string `json:"code"`
	Name string `json:"name"`
}

type Nationality struct {
	Code        int32  `json:"code"`
	Alpha2      string `json:"alpha_2"`
	Alpha3      string `json:"alpha_3"`
	Nationality string `json:"nationality"`
}

type PassportFingerPrint struct {
	ID        uuid.UUID    `json:"id"`
	PublicKey string       `json:"public_key"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt sql.NullTime `json:"updated_at"`
}

type RoleClass struct {
	Class       string         `json:"class"`
	Description sql.NullString `json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
}

type User struct {
	ID           uuid.UUID      `json:"id"`
	FirstName    sql.NullString `json:"first_name"`
	LastName     sql.NullString `json:"last_name"`
	Email        string         `json:"email"`
	PasswordHash string         `json:"password_hash"`
	BirthDate    sql.NullTime   `json:"birth_date"`
	Nationality  sql.NullInt32  `json:"nationality"`
	Sex          sql.NullString `json:"sex"`
	RoleID       uuid.NullUUID  `json:"role_id"`
	PhotoID      uuid.NullUUID  `json:"photo_id"`
	PhoneID      uuid.NullUUID  `json:"phone_id"`
	AddressID    uuid.NullUUID  `json:"address_id"`
	PassportID   uuid.NullUUID  `json:"passport_id"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    sql.NullTime   `json:"updated_at"`
}

type UserAddress struct {
	ID        uuid.UUID      `json:"id"`
	Country   sql.NullString `json:"country"`
	City      string         `json:"city"`
	Line1     string         `json:"line_1"`
	Line2     string         `json:"line_2"`
	Zip       string         `json:"zip"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
}

type UserPassport struct {
	ID                  uuid.UUID      `json:"id"`
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
	CreatedAt           time.Time      `json:"created_at"`
	UpdatedAt           sql.NullTime   `json:"updated_at"`
}

type UserPhone struct {
	ID          uuid.UUID    `json:"id"`
	CountryCode string       `json:"country_code"`
	Number      string       `json:"number"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   sql.NullTime `json:"updated_at"`
}

type UserPhoto struct {
	ID          uuid.UUID    `json:"id"`
	FileName    string       `json:"file_name"`
	MimeType    string       `json:"mime_type"`
	Url         string       `json:"url"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   sql.NullTime `json:"updated_at"`
	ExternalRef string       `json:"external_ref"`
	SecureUrl   string       `json:"secure_url"`
}

type UserRole struct {
	ID        uuid.UUID      `json:"id"`
	Name      string         `json:"name"`
	Class     sql.NullString `json:"class"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
}

type UserSex struct {
	Value string `json:"value"`
}
