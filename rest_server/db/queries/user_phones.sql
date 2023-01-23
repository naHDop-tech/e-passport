-- name: GetUserPhone :one
SELECT * FROM user_phones
WHERE id = $1 LIMIT 1;

-- name: CreateUserPhone :one
INSERT INTO user_phones
(country_code, "number")
VALUES ($1, $2) RETURNING *;

-- name: UpdateUserPhone :exec
UPDATE user_phones
SET country_code = $1, "number" = $2, updated_at = $3
WHERE id = $4;