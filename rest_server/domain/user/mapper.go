package user

import (
	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type ClearPhone struct {
	CountryCode string `json:"country_code"`
	Number      string `json:"number"`
}

type ClearPhoto struct {
	Url string `json:"url"`
}

type ClearFingerPrint struct {
	PublicKey string `json:"public_key"`
}

type ClearRole struct {
	Name  string `json:"role_name"`
	Class string `json:"role_class"`
}

type ClearAddress struct {
	Country string `json:"country"`
	City    string `json:"city"`
	Line1   string `json:"line_1"`
	Line2   string `json:"line_2"`
	Zip     string `json:"zip"`
}

type ClearPassport struct {
	CountryCode         string           `json:"passport_country_code"`
	IssuingOrganization string           `json:"issuing_organization"`
	MrzL1               string           `json:"mrz_l1"`
	MrzL2               string           `json:"mrz_l2"`
	UNumber             string           `json:"u_number"`
	PNumber             string           `json:"p_number"`
	IssueDate           string           `json:"passport_issue_date"`
	ExpirationDate      string           `json:"passport_expiration_date"`
	PlaceOfBirth        string           `json:"place_of_birth"`
	Type                string           `json:"passport_type"`
	FingerPrint         ClearFingerPrint `json:"finger_print"`
}

type ClearUser struct {
	ID           string        `json:"id"`
	FirstName    string        `json:"first_name"`
	LastName     string        `json:"last_name"`
	Email        string        `json:"email"`
	PasswordHash string        `json:"password_hash"`
	BirthDate    string        `json:"birth_date"`
	Nationality  int32         `json:"nationality"`
	Sex          string        `json:"sex"`
	Passport     ClearPassport `json:"passport"`
	Phone        ClearPhone    `json:"phone"`
	Photo        ClearPhoto    `json:"photo"`
	Address      ClearAddress  `json:"address"`
	Role         ClearRole     `json:"role"`
}

func (u *User) MarshallToObject(rawUser db.GetUserByIdRow) ClearUser {
	clearUser := ClearUser{
		ID:           rawUser.ID.String(),
		FirstName:    rawUser.FirstName.String,
		LastName:     rawUser.LastName.String,
		Email:        rawUser.Email,
		PasswordHash: rawUser.PasswordHash,
		BirthDate:    rawUser.BirthDate.Time.String(),
		Nationality:  rawUser.Nationality.Int32,
		Sex:          rawUser.Sex.String,
		Passport: ClearPassport{
			CountryCode:         rawUser.PassportCountryCode.String,
			IssuingOrganization: rawUser.IssuingOrganization.String,
			MrzL1:               rawUser.MrzL1.String,
			MrzL2:               rawUser.MrzL2.String,
			UNumber:             rawUser.UNumber.String,
			PNumber:             rawUser.PNumber.String,
			IssueDate:           rawUser.PassportIssueDate.Time.String(),
			ExpirationDate:      rawUser.PassportExpirationDate.Time.String(),
			PlaceOfBirth:        rawUser.PlaceOfBirth.String,
			Type:                rawUser.PassportType.String,
			FingerPrint: ClearFingerPrint{
				PublicKey: rawUser.PublicKey.String,
			},
		},
		Phone: ClearPhone{
			CountryCode: rawUser.PhoneCountryCode.String,
			Number:      rawUser.PhoneNumber.String,
		},
		Photo: ClearPhoto{
			Url: rawUser.PhotoUrl.String,
		},
		Address: ClearAddress{
			Line1:   rawUser.Line1.String,
			Line2:   rawUser.Line2.String,
			Country: rawUser.Country.String,
			City:    rawUser.City.String,
			Zip:     rawUser.Zip.String,
		},
		Role: ClearRole{
			Name:  rawUser.RoleName.String,
			Class: rawUser.RoleClass.String,
		},
	}
	return clearUser
}
