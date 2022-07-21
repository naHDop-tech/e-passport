docker run -d \
 --name e-passport-mysql \
 -e POSTGRES_PASSWORD=1qaz2wsx \
 -e POSTGRES_DB=e-passport-db \
 -e POSTGRES_USER=e-passport-user \
 -e PGDATA=/var/lib/postgresql/data/ \
 -v db:/var/lib/postgresql/data \
 -p 5432:5432 \
 postgres

npx typeorm migration:create -n <migration_name>
