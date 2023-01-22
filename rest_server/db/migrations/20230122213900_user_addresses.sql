-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "user_addresses" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "country" varchar(5),
    "city" varchar NOT NULL,
    "line_1" varchar NOT NULL,
    "line_2" varchar NOT NULL,
    "zip" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);

ALTER TABLE "user_addresses" ADD FOREIGN KEY ("country") REFERENCES "countries" ("code");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

ALTER TABLE "user_addresses" DROP CONSTRAINT "country";

DROP TABLE IF EXISTS "user_addresses";
-- +goose StatementEnd
