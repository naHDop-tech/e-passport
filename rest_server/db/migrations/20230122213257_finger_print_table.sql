-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "passport_finger_prints" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "public_key" varchar(500) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "passport_finger_prints";
-- +goose StatementEnd
