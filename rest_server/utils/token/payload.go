package token

import (
	"errors"
	"github.com/google/uuid"
	"time"
)

var (
	ErrExpiredToken = errors.New("token has expired")
	ErrInvalidToke  = errors.New("invalid toke")
)

type Payload struct {
	ID        uuid.UUID `json:"id"`
	UserId    string    `json:"user_id"`
	UserRole  string    `json:"user_role"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

func CreatePayload(userPayload UserPayload, duration time.Duration) (*Payload, error) {
	tokenId, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	payload := &Payload{
		ID:        tokenId,
		UserId:    userPayload.UserId,
		UserRole:  userPayload.UserRole,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}

	return payload, nil
}
func (p *Payload) Valid() error {
	if time.Now().After(p.ExpiredAt) {
		return ErrExpiredToken
	}

	return nil
}
