package login

import (
	"context"
	"errors"
	"github.com/naHDop-tech/e-passport/domain/user"
	"github.com/naHDop-tech/e-passport/utils"
	"github.com/naHDop-tech/e-passport/utils/token"
	"time"
)

type LoginService struct {
	userDomain *user.User
	tokenMaker token.Maker
}

func NewLoginService(userDomain *user.User, config utils.Config) *LoginService {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		panic("cannot create token maker")
	}
	return &LoginService{
		userDomain: userDomain,
		tokenMaker: tokenMaker,
	}
}

type LoginParams struct {
	Email         string
	Password      string
	TokenDuration time.Duration
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

	token, err := ls.tokenMaker.CreateToken(token.UserPayload{
		UserId:   existsUser.ID.String(),
		UserRole: existsUser.RoleClass.String,
	}, params.TokenDuration)
	if err != nil {
		return "", err
	}
	return token, nil
}
