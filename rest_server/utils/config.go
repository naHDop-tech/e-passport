package utils

import (
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	DBPort              string        `mapstructure:"DB_PORT"`
	DBHost              string        `mapstructure:"DB_HOST"`
	DBUser              string        `mapstructure:"DB_USER"`
	DBPassword          string        `mapstructure:"DB_PASSWORD"`
	DBDriver            string        `mapstructure:"DB_DRIVER"`
	DBName              string        `mapstructure:"DB_NAME"`
	AppHost             string        `mapstructure:"HOST"`
	AppPort             string        `mapstructure:"PORT"`
	TokenSymmetricKey   string        `mapstructure:"TOKEN_SYMMETRIC_KEY"`
	AccessTokenDuration time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	FileCloudApiName    string        `mapstructure:"CLOUDINARY_API_NAME"`
	FileCloudApiKey     string        `mapstructure:"CLOUDINARY_API_KEY"`
	FileCloudApiSecret  string        `mapstructure:"CLOUDINARY_API_SECRET"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
