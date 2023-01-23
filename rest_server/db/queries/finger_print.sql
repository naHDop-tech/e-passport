-- name: GetFingerPrint :one
SELECT * FROM passport_finger_prints
WHERE id = $1 LIMIT 1;

-- name: UpdateFingerPrint :exec
UPDATE passport_finger_prints
SET public_key = $1, updated_at = $2
WHERE id = $3;

-- name: CreateFingerPrint :one
INSERT INTO passport_finger_prints
(public_key)
VALUES ($1) RETURNING *;
