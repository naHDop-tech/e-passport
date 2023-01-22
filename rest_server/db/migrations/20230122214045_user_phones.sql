-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "user_phones" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "country_code" varchar NOT NULL,
    "number" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "user_phones";
-- +goose StatementEnd
