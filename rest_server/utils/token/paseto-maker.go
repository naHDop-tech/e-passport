package token

import (
	"fmt"
	"github.com/aead/chacha20poly1305"
	"github.com/o1egl/paseto"
	"time"
)

type PasetoMaker struct {
	paseto       *paseto.V2
	symmetricKey []byte
}

func NewPasetoMaker(symmetricKey string) (Maker, error) {
	fmt.Println("SIZD", len(symmetricKey))
	if len(symmetricKey) != chacha20poly1305.KeySize {
		return nil, fmt.Errorf("invalid key size: must be exactly %d characters", chacha20poly1305.KeySize)
	}

	maker := &PasetoMaker{
		paseto:       paseto.NewV2(),
		symmetricKey: []byte(symmetricKey),
	}

	return maker, nil
}

func (pm *PasetoMaker) CreateToken(userPayload UserPayload, duration time.Duration) (string, error) {
	payload, err := CreatePayload(userPayload, duration)
	if err != nil {
		return "", err
	}

	return pm.paseto.Encrypt(pm.symmetricKey, payload, nil)
}

func (pm *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	err := pm.paseto.Decrypt(token, pm.symmetricKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToke
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}
