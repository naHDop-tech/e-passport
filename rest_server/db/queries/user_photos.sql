-- name: GetUserPhoto :one
SELECT * FROM user_photos
WHERE id = $1 LIMIT 1;

-- name: CreateUserPhoto :one
INSERT INTO user_photos
(file_name, mime_type, url)
VALUES ($1, $2, $3) RETURNING id;

-- name: UpdateUserPhoto :exec
UPDATE user_photos
SET file_name = $1, mime_type = $2, url = $3, updated_at = $4
WHERE id = $5;