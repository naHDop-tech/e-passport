-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "user_passports" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "country_code" varchar(5),
    "issuing_organization" varchar NOT NULL,
    "mrz_l1" varchar NOT NULL,
    "mrz_l2" varchar NOT NULL,
    "u_number" varchar(30) NOT NULL,
    "p_number" varchar(30) NOT NULL,
    "issue_date" timestamptz NOT NULL,
    "expiration_date" timestamptz NOT NULL,
    "place_of_birth" varchar NOT NULL,
    "type" varchar(5) NOT NULL,
    "finger_print_id" uuid,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);

ALTER TABLE "user_passports" ADD FOREIGN KEY ("country_code") REFERENCES "countries" ("code");

ALTER TABLE "user_passports" ADD FOREIGN KEY ("finger_print_id") REFERENCES "passport_finger_prints" ("id");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

ALTER TABLE "user_passports" DROP CONSTRAINT "country_code";
ALTER TABLE "user_passports" DROP CONSTRAINT "finger_print_id";

DROP TABLE IF EXISTS "user_passports";
-- +goose StatementEnd
