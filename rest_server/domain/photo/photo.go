package photo

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"mime/multipart"
	"time"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/google/uuid"
	db "github.com/naHDop-tech/e-passport/db/sqlc"
	file_manager "github.com/naHDop-tech/e-passport/utils/file-manager"
)

var (
	errFileAlreadyExists = errors.New("user already have photo")
	errFileNotExists     = errors.New("user don't have photo")
)

type Resolver interface {
	UploadFile(ctx context.Context, file multipart.File, params uploader.UploadParams, userId uuid.UUID) error
	UpdateFile(ctx context.Context, file multipart.File, params uploader.UploadParams, userId uuid.UUID, photoId uuid.UUID) error
}

type Photo struct {
	repository  *db.Store
	fileManager file_manager.FileManager
}

func NewPhoto(conn *sql.DB, fileManager file_manager.FileManager) Resolver {
	return &Photo{
		repository:  db.NewStore(conn),
		fileManager: fileManager,
	}
}

func (p *Photo) UploadFile(ctx context.Context, file multipart.File, params uploader.UploadParams, userId uuid.UUID) error {
	err := p.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, err := q.GetUserById(ctx, userId)
		if err != nil {
			return err
		}
		if existsUser.PhotoID.Valid {
			return errFileAlreadyExists
		}
		uploadedFile, err := p.fileManager.UploadFile(ctx, file, params)
		if err != nil {
			return err
		}
		fileId, err := q.CreateUserPhoto(ctx, db.CreateUserPhotoParams{
			FileName:    params.PublicID,
			MimeType:    "empty",
			Url:         uploadedFile.PublicLink,
			ExternalRef: uploadedFile.ExternalRef,
			SecureUrl:   uploadedFile.SecureLink,
		})
		if err != nil {
			return err
		}
		err = q.SetPhotoRelation(ctx, db.SetPhotoRelationParams{
			PhotoID: uuid.NullUUID{Valid: true, UUID: fileId},
			ID:      existsUser.ID,
		})

		return err
	})

	return err
}

func (p *Photo) UpdateFile(
	ctx context.Context,
	file multipart.File,
	params uploader.UploadParams,
	userId uuid.UUID,
	photoId uuid.UUID,
) error {
	err := p.repository.ExecTx(ctx, func(q *db.Queries) error {
		existsUser, err := q.GetUserById(ctx, userId)
		if err != nil {
			return err
		}
		if !existsUser.PhotoID.Valid {
			return errFileNotExists
		}
		uploadedFile, err := p.fileManager.UploadFile(ctx, file, params)
		if err != nil {
			return err
		}
		err = q.UpdateUserPhoto(ctx, db.UpdateUserPhotoParams{
			FileName:    params.PublicID,
			MimeType:    "empty",
			Url:         uploadedFile.PublicLink,
			UpdatedAt:   sql.NullTime{Valid: true, Time: time.Now()},
			ExternalRef: uploadedFile.ExternalRef,
			SecureUrl:   uploadedFile.SecureLink,
			ID:          existsUser.PhotoID.UUID,
		})
		if err != nil {
			return err
		}

		destroyFile, err := p.fileManager.DestroyFile(ctx, uploader.DestroyParams{
			PublicID: params.PublicID,
		})
		if err != nil {
			return err
		}
		fmt.Println("Previous file has destroyed:", destroyFile)
		return err
	})
	return err
}
