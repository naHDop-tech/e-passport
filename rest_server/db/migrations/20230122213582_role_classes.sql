-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "role_classes" (
    "class" varchar(50) PRIMARY KEY,
    "description" varchar,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "role_classes";
-- +goose StatementEnd
