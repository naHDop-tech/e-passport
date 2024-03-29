-- name: GetUserById :one
SELECT
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.password_hash,
    u.birth_date,
    u.sex,
    un.nationality,
    un.code as "nationality_code",
    un.alpha_2,
    un.alpha_3,
    ur.id as "role_id",
    ur.name as "role_name",
    ur.class as "role_class",
    ua.id as "address_id",
    ua.country,
    ua.city,
    ua.line_1,
    ua.line_2,
    ua.zip,
    upn.id as "phone_id",
    upn.country_code as "phone_country_code",
    upn.number as "phone_number",
    upt.id as "photo_id",
    upt.url as "photo_url",
    upt.secure_url as "photo_secure_url",
    upt.external_ref as "photo_external_ref",
    up.id as "passport_id",
    up.country_code as "passport_country_code",
    up.issuing_organization,
    up.mrz_l1,
    up.mrz_l2,
    up.u_number,
    up.p_number,
    up.issue_date as "passport_issue_date",
    up.expiration_date as "passport_expiration_date",
    up.place_of_birth,
    up.type as "passport_type",
    fp.id as "finger_print_id",
    fp.public_key
FROM users u
LEFT JOIN nationalities un ON un.code = u.nationality
LEFT JOIN user_roles ur ON ur.id = u.role_id
LEFT JOIN user_addresses ua ON ua.id = u.address_id
LEFT JOIN user_phones upn ON upn.id = u.phone_id
LEFT JOIN user_photos upt ON upt.id = u.photo_id
LEFT JOIN user_passports up ON up.id = u.passport_id
LEFT JOIN passport_finger_prints fp ON fp.id = up.finger_print_id
WHERE u.id = $1 LIMIT 1;

-- name: GetUserByEmail :one
SELECT
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.password_hash,
    u.birth_date,
    u.sex,
    un.nationality,
    un.code as "nationality_code",
    un.alpha_2,
    un.alpha_3,
    ur.id as "role_id",
    ur.name as "role_name",
    ur.class as "role_class",
    ua.id as "address_id",
    ua.country,
    ua.city,
    ua.line_1,
    ua.line_2,
    ua.zip,
    upn.id as "phone_id",
    upn.country_code as "phone_country_code",
    upn.number as "phone_number",
    upt.id as "photo_id",
    upt.url as "photo_url",
    upt.secure_url as "photo_secure_url",
    upt.external_ref as "photo_external_ref",
    up.id as "passport_id",
    up.country_code as "passport_country_code",
    up.issuing_organization,
    up.mrz_l1,
    up.mrz_l2,
    up.u_number,
    up.p_number,
    up.issue_date as "passport_issue_date",
    up.expiration_date as "passport_expiration_date",
    up.place_of_birth,
    up.type as "passport_type",
    fp.id as "finger_print_id",
    fp.public_key
FROM users u
LEFT JOIN nationalities un ON un.code = u.nationality
LEFT JOIN user_roles ur ON ur.id = u.role_id
LEFT JOIN user_addresses ua ON ua.id = u.address_id
LEFT JOIN user_phones upn ON upn.id = u.phone_id
LEFT JOIN user_photos upt ON upt.id = u.photo_id
LEFT JOIN user_passports up ON up.id = u.passport_id
LEFT JOIN passport_finger_prints fp ON fp.id = up.finger_print_id
WHERE u.email = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users
(email, password_hash, role_id)
VALUES ($1, $2, $3) RETURNING id, email;

-- name: UpdateUser :exec
UPDATE users
SET first_name = $1, last_name = $2, birth_date = $3, nationality = $4, sex = $5, updated_at = $6
WHERE id = $7;

-- name: SetAddressRelation :exec
UPDATE users
SET address_id = $1
WHERE id = $2;

-- name: SetPhoneRelation :exec
UPDATE users
SET phone_id = $1
WHERE id = $2;

-- name: SetPhotoRelation :exec
UPDATE users
SET photo_id = $1
WHERE id = $2;

-- name: SetPassportRelation :exec
UPDATE users
SET passport_id = $1
WHERE id = $2;
