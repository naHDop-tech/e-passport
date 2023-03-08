package user

import (
	db "github.com/naHDop-tech/e-passport/db/sqlc"
)

type ClearPhone struct {
	PhoneId     string `json:"phone_id"`
	CountryCode string `json:"country_code"`
	Number      string `json:"number"`
}

type ClearPhoto struct {
	PhotoID    string `json:"photo_id"`
	Url        string `json:"url"`
	ExternalId string `json:"external_id"`
	SecureUrl  string `json:"secure_url"`
}

type ClearFingerPrint struct {
	FingerPrintID string `json:"finger_print_id"`
	PublicKey     string `json:"public_key"`
}

type ClearRole struct {
	RoleId string `json:"role_id"`
	Name   string `json:"role_name"`
	Class  string `json:"role_class"`
}

type ClearNationality struct {
	Nationality string `json:"nationality"`
	Code        int32  `json:"code"`
	Alpha2      string `json:"alpha2"`
	Alpha3      string `json:"alpha3"`
}

type ClearAddress struct {
	AddressID string `json:"address_id"`
	Country   string `json:"country"`
	City      string `json:"city"`
	Line1     string `json:"line_1"`
	Line2     string `json:"line_2"`
	Zip       string `json:"zip"`
}

type ClearPassport struct {
	PassportID          string           `json:"passport_id"`
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
	ID           string           `json:"id"`
	FirstName    string           `json:"first_name"`
	LastName     string           `json:"last_name"`
	Email        string           `json:"email"`
	PasswordHash string           `json:"password_hash"`
	BirthDate    string           `json:"birth_date"`
	Sex          string           `json:"sex"`
	Nationality  ClearNationality `json:"nationality"`
	Passport     ClearPassport    `json:"passport"`
	Phone        ClearPhone       `json:"phone"`
	Photo        ClearPhoto       `json:"photo"`
	Address      ClearAddress     `json:"address"`
	Role         ClearRole        `json:"role"`
}

func (u *User) MarshallToStruct(rawUser *db.GetUserByIdRow) *ClearUser {
	clearUser := ClearUser{
		ID:           rawUser.ID.String(),
		FirstName:    rawUser.FirstName.String,
		LastName:     rawUser.LastName.String,
		Email:        rawUser.Email,
		PasswordHash: rawUser.PasswordHash,
		BirthDate:    rawUser.BirthDate.Time.String(),
		Sex:          rawUser.Sex.String,
		Nationality: ClearNationality{
			Code:        rawUser.NationalityCode.Int32,
			Nationality: rawUser.Nationality.String,
			Alpha2:      rawUser.Alpha2.String,
			Alpha3:      rawUser.Alpha3.String,
		},
		Passport: ClearPassport{
			PassportID:          rawUser.PassportID.UUID.String(),
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
				FingerPrintID: rawUser.FingerPrintID.UUID.String(),
				PublicKey:     rawUser.PublicKey.String,
			},
		},
		Phone: ClearPhone{
			PhoneId:     rawUser.PhoneID.UUID.String(),
			CountryCode: rawUser.PhoneCountryCode.String,
			Number:      rawUser.PhoneNumber.String,
		},
		Photo: ClearPhoto{
			PhotoID:    rawUser.PhotoID.UUID.String(),
			Url:        rawUser.PhotoUrl.String,
			SecureUrl:  rawUser.PhotoSecureUrl.String,
			ExternalId: rawUser.PhotoExternalRef.String,
		},
		Address: ClearAddress{
			AddressID: rawUser.AddressID.UUID.String(),
			Line1:     rawUser.Line1.String,
			Line2:     rawUser.Line2.String,
			Country:   rawUser.Country.String,
			City:      rawUser.City.String,
			Zip:       rawUser.Zip.String,
		},
		Role: ClearRole{
			RoleId: rawUser.RoleID.UUID.String(),
			Name:   rawUser.RoleName.String,
			Class:  rawUser.RoleClass.String,
		},
	}
	return &clearUser
}
