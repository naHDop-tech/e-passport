package passport

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	"github.com/naHDop-tech/e-passport/utils/passport"
)

var (
	errUserAlreadyHavePassport = errors.New("user already have passport")
	errPassportNotExists       = errors.New("passport not exists")
	errUserNotExists           = errors.New("user not exists")
)

type PassportResolver interface {
	Create(ctx context.Context, payload CreatePassportParams) (uuid.UUID, error)
	Update(ctx context.Context, payload UpdatePassportParams) error
}

type Passport struct {
	identificator passport.IdetificatorResolver
	repository    *db.Store
}

func NewPassport(conn *sql.DB, identificator passport.IdetificatorResolver) PassportResolver {
	return &Passport{
		identificator: identificator,
		repository:    db.NewStore(conn),
	}
}

type CreatePassportParams struct {
	db.CreateUserPassportParams
	UserId    uuid.UUID
	PublicKey string
}

func (p *Passport) Create(ctx context.Context, payload CreatePassportParams) (uuid.UUID, error) {
	var passportId uuid.UUID

	err := p.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, err := q.GetUserById(ctx, payload.UserId)
		if err != nil {
			return err
		}
		if existsUser.PassportID.Valid {
			return errUserAlreadyHavePassport
		}

		pNumber := p.identificator.PassportNumber()
		uNumber, err := p.identificator.UserNumber(passport.UserNumberParams{
			FirstName:    existsUser.FirstName.String,
			LastName:     existsUser.LastName.String,
			PlaceOfBirth: payload.PlaceOfBirth,
		})
		if err != nil {
			return err
		}

		today := time.Now()
		expirationDate := today.AddDate(10, 0, 0)

		mrzLines, err := p.identificator.MachineReadableZoneLines(passport.MRZZLinesParams{
			Type:           payload.Type,
			Sex:            existsUser.Sex.String,
			CountryCode:    payload.CountryCode.String,
			FirstName:      existsUser.FirstName.String,
			LastName:       existsUser.LastName.String,
			PNumber:        pNumber,
			UNumber:        *uNumber,
			Nationality:    existsUser.Nationality.String,
			ExpirationDate: expirationDate,
			DateOfBirth:    existsUser.BirthDate.Time,
		})
		if err != nil {
			return err
		}

		pfId, err := q.CreateFingerPrint(ctx, payload.PublicKey)
		if err != nil {
			return err
		}

		passportId, err = q.CreateUserPassport(ctx, db.CreateUserPassportParams{
			CountryCode:         payload.CountryCode,
			IssuingOrganization: payload.IssuingOrganization,
			MrzL1:               mrzLines.MrzL1,
			MrzL2:               mrzLines.MrzL2,
			UNumber:             *uNumber,
			PNumber:             pNumber,
			IssueDate:           today,
			ExpirationDate:      expirationDate,
			PlaceOfBirth:        existsUser.PlaceOfBirth.String,
			Type:                payload.Type,
			FingerPrintID:       uuid.NullUUID{Valid: true, UUID: pfId},
		})
		return err
	})

	return passportId, err
}

type UpdatePassportParams struct {
	db.UpdateUserPassportParams
	UserId    uuid.UUID
	PublicKey string
}

func (p *Passport) Update(ctx context.Context, payload UpdatePassportParams) error {
	err := p.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, err := p.repository.GetUserById(ctx, payload.UserId)
		if err != nil {
			return err
		}
		if existsUser.ID == uuid.Nil {
			return errUserNotExists
		}
		if !existsUser.PassportID.Valid {
			return errPassportNotExists
		}
		existsPassport, err := p.repository.GetUserPassport(ctx, payload.ID)
		if err != nil {
			return err
		}

		if len(payload.PublicKey) > 1 {
			err = q.UpdateFingerPrint(ctx, db.UpdateFingerPrintParams{
				PublicKey: payload.PublicKey,
				UpdatedAt: sql.NullTime{Valid: true, Time: time.Now()},
				ID:        payload.ID,
			})
			if err != nil {
				return err
			}
		}

		mrzLines, err := p.identificator.MachineReadableZoneLines(passport.MRZZLinesParams{
			Type:           existsPassport.Type,
			Sex:            existsUser.Sex.String,
			CountryCode:    payload.CountryCode.String,
			FirstName:      existsUser.FirstName.String,
			LastName:       existsUser.LastName.String,
			PNumber:        existsPassport.PNumber,
			UNumber:        existsPassport.UNumber,
			Nationality:    existsUser.Nationality.String,
			ExpirationDate: existsPassport.ExpirationDate,
			DateOfBirth:    existsUser.BirthDate.Time,
		})
		if err != nil {
			return err
		}

		today := time.Now()
		expirationDate := today.AddDate(10, 0, 0)

		err = q.UpdateUserPassport(ctx, db.UpdateUserPassportParams{
			CountryCode:         payload.CountryCode,
			IssuingOrganization: existsPassport.IssuingOrganization,
			MrzL1:               mrzLines.MrzL1,
			MrzL2:               mrzLines.MrzL2,
			UNumber:             existsPassport.UNumber,
			PNumber:             existsPassport.PNumber,
			IssueDate:           today,
			ExpirationDate:      expirationDate,
			PlaceOfBirth:        payload.PlaceOfBirth,
			Type:                existsPassport.Type,
			FingerPrintID:       existsPassport.FingerPrintID,
			UpdatedAt:           sql.NullTime{Valid: true, Time: time.Now()},
			ID:                  existsPassport.ID,
		})

		return err
	})
	return err
}
