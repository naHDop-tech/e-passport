-- name: GetUserPhoto :one
SELECT * FROM user_photos
WHERE id = $1 LIMIT 1;

-- name: CreateUserPhoto :one
INSERT INTO user_photos
(file_name, mime_type, url, external_ref, secure_url)
VALUES ($1, $2, $3, $4, $5) RETURNING id;

-- name: UpdateUserPhoto :exec
UPDATE user_photos
SET file_name = $1, mime_type = $2, url = $3, updated_at = $4, external_ref = $5, secure_url = $6
WHERE id = $7;