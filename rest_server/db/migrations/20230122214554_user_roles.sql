-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "user_roles" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "name" varchar NOT NULL,
    "class" varchar(50),
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);

ALTER TABLE "user_roles" ADD FOREIGN KEY ("class") REFERENCES "role_classes" ("class");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

ALTER TABLE "user_roles" DROP CONSTRAINT "class";

DROP TABLE IF EXISTS "user_roles";
-- +goose StatementEnd
