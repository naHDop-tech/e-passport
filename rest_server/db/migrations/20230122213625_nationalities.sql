-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "nationalities" (
    "code" int PRIMARY KEY,
    "alpha_2" varchar(10) NOT NULL,
    "alpha_3" varchar(10) NOT NULL,
    "nationality" varchar NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "nationalities";
-- +goose StatementEnd
