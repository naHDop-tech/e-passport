-- name: GetUserAddress :one
SELECT * FROM user_addresses
WHERE id = $1 LIMIT 1;

-- name: CreateUserAddress :one
INSERT INTO user_addresses
(country, city, line_1, line_2, zip)
VALUES ($1, $2, $3, $4, $5) RETURNING id;

-- name: UpdateUserAddress :exec
UPDATE user_addresses
SET country = $1, city = $2, line_1 = $3, line_2 = $4, zip = $5, updated_at = $6
WHERE id = $7;