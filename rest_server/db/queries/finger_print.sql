-- name: GetFingerPrint :one
SELECT * FROM passport_finger_prints
WHERE id = $1 LIMIT 1;

-- name: UpdateFingerPrint :one
UPDATE passport_finger_prints
SET public_key = $1, updated_at = $2, updated_at = $3
WHERE id = $4 RETURNING *;

-- name: CreateFingerPrint :one
INSERT INTO passport_finger_prints
(public_key)
VALUES ($1) RETURNING *;
