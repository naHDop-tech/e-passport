-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TABLE "users" (
    "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password_hash" varchar NOT NULL,
    "birth_date" timestamptz NOT NULL,
    "nationality" int,
    "sex" varchar(5),
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

ALTER TABLE "users" DROP CONSTRAINT "nationality";
ALTER TABLE "users" DROP CONSTRAINT "sex";
ALTER TABLE "users" DROP CONSTRAINT "role_id";
ALTER TABLE "users" DROP CONSTRAINT "photo_id";
ALTER TABLE "users" DROP CONSTRAINT "phone_id";
ALTER TABLE "users" DROP CONSTRAINT "address_id";
ALTER TABLE "users" DROP CONSTRAINT "passport_id";

DROP TABLE IF EXISTS "users";
-- +goose StatementEnd
