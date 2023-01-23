-- name: GetUserPassport :one
SELECT * FROM user_passports
WHERE id = $1;

-- name: CreateUserPassport :one
INSERT INTO user_passports
(
    country_code,
    issuing_organization,
    mrz_l1,
    mrz_l2,
    u_number,
    p_number,
    issue_date,
    expiration_date,
    place_of_birth,
    "type",
    finger_print_id
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;

-- name: UpdateUserPassport :exec
UPDATE user_passports SET
    country_code = $1,
    issuing_organization = $2,
    mrz_l1 = $3,
    mrz_l2 = $4,
    u_number = $5,
    p_number = $6,
    issue_date = $7,
    expiration_date = $8,
    place_of_birth = $9,
    "type" = $10,
    finger_print_id = $11,
    updated_at = $12
WHERE id = $13;