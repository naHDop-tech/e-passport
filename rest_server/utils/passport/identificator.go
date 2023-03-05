package passport

import "time"

type UserNumberParams struct {
	FirstName    string
	LastName     string
	PlaceOfBirth string
}

type MRZLines struct {
	MrzL1 string
	MrzL2 string
}

type MRZZLinesParams struct {
	Type           string
	Sex            string
	CountryCode    string
	FirstName      string
	LastName       string
	PNumber        string
	UNumber        string
	Nationality    string
	ExpirationDate time.Time
	DateOfBirth    time.Time
}

type IdetificatorResolver interface {
	UserNumber(UserNumberParams) (*string, error)
	PassportNumber() string
	MachineReadableZoneLines(payload MRZZLinesParams) (*MRZLines, error)
	RandomHash(str string) string
	RandomInt(max int, min int) int
}

type identificator struct{}

func NewIdentifacator() IdetificatorResolver {
	return &identificator{}
}

func (i *identificator) UserNumber(params UserNumberParams) (*string, error) {
	//TODO implement me
	panic("implement me")
}

func (i *identificator) PassportNumber() string {
	//TODO implement me
	panic("implement me")
}

func (i *identificator) MachineReadableZoneLines(payload MRZZLinesParams) (*MRZLines, error) {
	//TODO implement me
	panic("implement me")
}

func (i *identificator) RandomHash(str string) string {
	//TODO implement me
	panic("implement me")
}

func (i *identificator) RandomInt(max int, min int) int {
	//TODO implement me
	panic("implement me")
}
