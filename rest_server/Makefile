DB_NAME=di-passport-db
DB_PASS=1qaz2wsx
DB_USER=di-passport-user
DB_HOST=0.0.0.0
BD_PORT=5432

test:
	go test -v -cover ./...
sqlc_init:
	sqlc init
sqlc:
	sqlc generate
migrate_up:
	goose -dir=./db/migrations postgres "host=$(DB_HOST) user=$(DB_USER) password=$(DB_PASS) dbname=$(DB_NAME) sslmode=disable" up
migrate_down:
	goose -dir=./db/migrations postgres "host=$(DB_HOST) user=$(DB_USER) password=$(DB_PASS) dbname=$(DB_NAME) sslmode=disable" down
migrate_file:
	goose create $(file_name) sql
start:
	go run main.go