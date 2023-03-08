-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "users" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar NOT NULL,
    "password_hash" varchar NOT NULL,
    "birth_date" timestamptz,
    "nationality" int,
    "sex" varchar(15),
    "role_id" uuid,
    "photo_id" uuid,
    "phone_id" uuid,
    "address_id" uuid,
    "passport_id" uuid,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz
);

ALTER TABLE "users" ADD FOREIGN KEY ("nationality") REFERENCES "nationalities" ("code");

ALTER TABLE "users" ADD FOREIGN KEY ("sex") REFERENCES "user_sex" ("value");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "user_roles" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("photo_id") REFERENCES "user_photos" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("phone_id") REFERENCES "user_phones" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("address_id") REFERENCES "user_addresses" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("passport_id") REFERENCES "user_passports" ("id");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "nationality";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "sex";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "role_id";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "photo_id";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "phone_id";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "address_id";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "passport_id";

DROP TABLE IF EXISTS "users";
-- +goose StatementEnd
