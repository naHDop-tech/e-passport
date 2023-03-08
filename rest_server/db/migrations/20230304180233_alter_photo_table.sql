-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
ALTER TABLE "user_photos"
ADD COLUMN "external_ref" VARCHAR NOT NULL;

ALTER TABLE "user_photos"
ADD COLUMN "secure_url" VARCHAR NOT NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
ALTER TABLE "user_photos"
DROP COLUMN "external_ref";

ALTER TABLE "user_photos"
DROP COLUMN "secure_url";
-- +goose StatementEnd
