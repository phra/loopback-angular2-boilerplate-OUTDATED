pg_dump --inserts --schema=public --no-owner -v -f "dump-`date '+%Y-%m-%d-%T'`.sql" `cat ../server/datasources.json | grep -A 2 postgres | grep database | cut -d'"' -f 4`
