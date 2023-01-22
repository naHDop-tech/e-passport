-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "user_sex" (
    "value" varchar(5) PRIMARY KEY
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS "user_sex";
-- +goose StatementEnd
