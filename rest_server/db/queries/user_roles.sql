-- name: CreateUserRole :one
INSERT INTO user_roles ("name", "class")
VALUES ($1, $2) RETURNING id;

-- name: UpdateUserRole :exec
UPDATE user_roles SET "class" = $1, updated_at = $2
WHERE id = $3;

-- name: GetUserRole :one
SELECT * FROM user_roles
WHERE id = $1 LIMIT 1;