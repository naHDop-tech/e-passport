package login

import (
	"context"
	"errors"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/utils"
)

type LoginService struct {
	userDomain *user.User
}

func NewLoginService(userDomain *user.User) *LoginService {
	return &LoginService{
		userDomain: userDomain,
	}
}

type LoginParams struct {
	Email    string
	Password string
}

func (ls *LoginService) Login(ctx context.Context, params LoginParams) (jwt string, err error) {
	existsUser, err := ls.userDomain.GetUserByEmail(ctx, params.Email)
	if err != nil {
		return "", err
	}
	isPwdValid := utils.ComparePasswords(existsUser.PasswordHash, []byte(params.Password))
	if !isPwdValid {
		return "", errors.New("invalid password")
	}

	// TODO: make JWT
	return
}
