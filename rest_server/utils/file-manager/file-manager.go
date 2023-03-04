package file_manager

import (
	"context"
	"errors"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/admin"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/naHDop-tech/e-passport/utils"
)

var (
	errUploadFailed  = errors.New("file upload has failed")
	errGetFileFailed = errors.New("getting file has failed")
)

type UploaderResult struct {
	SecureLink  string `json:"secure_link"`
	PublicLink  string `json:"public_link"`
	ExternalRef string `json:"external_ref"`
}

// Docs here https://cloudinary.com/documentation/go_integration
type FileManager interface {
	UploadFile(ctx context.Context, file multipart.File, param uploader.UploadParams) (*UploaderResult, error)
	GetFile(ctx context.Context, param admin.AssetParams) (*UploaderResult, error)
}

type fileManager struct {
	client *cloudinary.Cloudinary
}

func NewFileManager(cfg utils.Config) FileManager {
	cld, _ := cloudinary.NewFromParams(cfg.FileCloudApiName, cfg.FileCloudApiKey, cfg.FileCloudApiSecret)
	return &fileManager{
		client: cld,
	}
}

func (f *fileManager) UploadFile(ctx context.Context, file multipart.File, param uploader.UploadParams) (*UploaderResult, error) {
	asset, err := f.client.Upload.Upload(ctx, file, param)
	if err != nil {
		return nil, errUploadFailed
	}

	return &UploaderResult{
		PublicLink:  asset.URL,
		SecureLink:  asset.SecureURL,
		ExternalRef: asset.PublicID,
	}, nil
}

func (f *fileManager) GetFile(ctx context.Context, param admin.AssetParams) (*UploaderResult, error) {
	asset, err := f.client.Admin.Asset(ctx, param)
	if err != nil {
		return nil, errGetFileFailed
	}

	return &UploaderResult{
		SecureLink:  asset.SecureURL,
		PublicLink:  asset.URL,
		ExternalRef: asset.PublicID,
	}, nil
}
