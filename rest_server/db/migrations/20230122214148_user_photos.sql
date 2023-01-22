-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "user_photos" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "file_name" varchar NOT NULL,
    "mime_type" varchar NOT NULL,
    "url" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "user_photos";
-- +goose StatementEnd
