-- name: ListRoleClasses :many
SELECT * FROM role_classes
ORDER BY "class";

-- name: GetRoleClass :one
SELECT * FROM role_classes
WHERE "class" = $1;

-- name: CreateRoleClass :one
INSERT INTO role_classes ("class")
VALUES ($1) RETURNING *;