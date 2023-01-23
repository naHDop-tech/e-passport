-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "countries" (
    "code" varchar(10) PRIMARY KEY,
    "name" varchar NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "countries";
-- +goose StatementEnd
