-- name: ListNationalities :many
SELECT * FROM nationalities
ORDER BY alpha_2;

-- name: GetNationality :one
SELECT * FROM nationalities
WHERE code = $1 LIMIT 1;