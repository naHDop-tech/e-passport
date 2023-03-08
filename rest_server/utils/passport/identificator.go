package passport

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

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
	UserNumber(UserNumberParams) string
	PassportNumber() string
	MachineReadableZoneLines(payload MRZZLinesParams) (*MRZLines, error)
	HashWithLen(str string, len int) string
	RandomInt(max int, min int) int
}

type identificator struct{}

var (
	errToShortVars = errors.New("code is too short")
)

func NewIdentifacator() IdetificatorResolver {
	return &identificator{}
}

const MrzLineLimitLen = 44

func (i *identificator) UserNumber(params UserNumberParams) string {
	lastFirstName := fmt.Sprintf("%s%s", params.FirstName, params.LastName)
	hash := i.HashWithLen(lastFirstName, 8)
	userNumber := fmt.Sprintf("%s%s", strings.ToUpper(params.PlaceOfBirth[0:2]), strings.ToUpper(hash))
	return userNumber
}

func (i *identificator) PassportNumber() string {
	rand := i.RandomInt(100000000, 999999999)
	return strconv.Itoa(rand)
}

func (i *identificator) MachineReadableZoneLines(payload MRZZLinesParams) (*MRZLines, error) {
	var mrzL1 string
	var mrzL2 string

	if len(payload.CountryCode) < 3 || len(payload.CountryCode) < 3 {
		return nil, errToShortVars
	}
	rand1 := i.RandomInt(1, 9)
	rand2 := i.RandomInt(1, 9)
	rand3 := i.RandomInt(1, 9)
	checkSum := strings.ToUpper(i.HashWithLen(fmt.Sprintf("%s%s%s", strconv.Itoa(rand1), strconv.Itoa(rand2), strconv.Itoa(rand3)), 2))
	sexId := payload.Sex[0:1]
	lastName := strings.Replace(payload.LastName, " ", "<", -1)
	dateOfBirth := fmt.Sprintf("%d%d%d", payload.DateOfBirth.Year(), payload.DateOfBirth.Month(), payload.DateOfBirth.Day())
	expirationDate := fmt.Sprintf("%d%d%d", payload.ExpirationDate.Year(), payload.ExpirationDate.Month(), payload.ExpirationDate.Day())

	mrzL1 = fmt.Sprintf("%s<%s%s<<%s", payload.Type, payload.CountryCode, strings.ToUpper(payload.FirstName), strings.ToUpper(lastName))
	if len(mrzL1) > MrzLineLimitLen {
		fmt.Println("l1 line is too long")
		mrzL1 = mrzL1[1:MrzLineLimitLen]
	} else {
		for len(mrzL1) < MrzLineLimitLen {
			mrzL1 = mrzL1 + "<"
		}
	}

	mrzL2 = fmt.Sprintf(
		"%s<%d%s%s%d%s%s%d%s",
		payload.PNumber,
		rand1,
		payload.Nationality,
		dateOfBirth,
		rand2,
		sexId,
		expirationDate,
		rand3,
		payload.UNumber,
	)

	for len(mrzL2) < MrzLineLimitLen {
		if len(mrzL2) == 42 {
			mrzL2 = mrzL2 + checkSum
			break
		}
		mrzL2 = mrzL2 + "<"
	}

	return &MRZLines{
		MrzL2: mrzL2,
		MrzL1: mrzL1,
	}, nil
}

func (i *identificator) HashWithLen(str string, len int) string {
	hash := md5.Sum([]byte(str))
	return hex.EncodeToString(hash[:])[0:len]
}

func (i *identificator) RandomInt(min int, max int) int {
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(max-min) + min
}
